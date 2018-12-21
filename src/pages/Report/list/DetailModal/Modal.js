import React, { lazy, Suspense } from 'react';
import { Modal, Form, Spin } from 'antd';
import { connect } from 'dva';
import rebuild from '@/utils/rebuild';
import DataContext from './common/DataContext';
import { dateFormat } from './common/config';
import ModalContent from './ModalContent';

@rebuild({
    beforeOpen: (props) => {
        if (props.isEdit) {
            props.dispatch({
                type: 'reportList/fetch',
                payload: props.id
            })
        }
    },
    afterClose: (props) => {
        props.dispatch({
            type: 'reportList/clearCurrent',
        })
    }
})
class ExampleModal extends React.PureComponent {

    handleCancel = () => {
        this.props.dispatch({
            type: 'reportList/toggleDetailModalVisible',
            payload: false,
        })
    }

    handleSubmit = () => {
        const { form, current, isEdit } = this.props;
        form.validateFieldsAndScroll((errors, value) => {
            console.log(errors, value, 'submit data');
            if (errors) return;
            const payload = {
                ...value,
                createdAt: value.createdAt ? value.createdAt.format(dateFormat) : undefined,
            }
            if (isEdit) {
                this.props.dispatch({
                    type: 'reportList/update',
                    payload: {
                        ...current,
                        ...payload,
                    },
                })
            } else {
                this.props.dispatch({
                    type: 'reportList/add',
                    payload,
                })
            }
        })
    }

    render() {
        const { visible, form, loading, addLoading, updateLoading, isEdit } = this.props;
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                title='新建'
                confirmLoading={isEdit ? updateLoading : addLoading}
                width={800}
                bodyStyle={{ padding: 0, minHeight: 200 }}
                onOk={this.handleSubmit}
            >
                <Spin spinning={loading}>
                    <DataContext.Provider value={{ form, isEdit }}>
                        <ModalContent />
                    </DataContext.Provider>
                </Spin>
            </Modal>
        )
    }
}

export default connect(
    (state) => ({
        visible: state.reportList.detailModalVisible,
        current: state.reportList.current,
        id: state.reportList.id,
        isEdit: typeof state.reportList.id !== 'undefined',
        loading: state.loading.effects['reportList/fetch'] || false,
        addLoading: state.loading.effects['reportList/add'] || false,
        updateLoading: state.loading.effects['reportList/update'] || false,
    })
)(
    Form.create()(ExampleModal)
);
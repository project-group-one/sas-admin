import React, { lazy, Suspense } from 'react';
import { Modal, Form, Spin, message } from 'antd';
import { connect } from 'dva';
import rebuild from '@/utils/rebuild';
import DataContext from './common/DataContext';
import { dateFormat } from './common/config';
import ModalContent from './ModalContent';

@rebuild({
    beforeOpen: (props) => {
        if (props.isEdit) {
            props.dispatch({
                type: 'reportList/fetchItem',
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
            payload: { visible: false },
        })
    }

    handleSubmit = () => {
        const { form, current, isEdit } = this.props;
        form.validateFieldsAndScroll(async (errors, value) => {
            if (errors) return;
            if (isEdit) {
                await this.props.dispatch({
                    type: 'reportList/update',
                    payload: {
                        ...current,
                        ...value,
                    },
                })
            } else {
                let path = '';
                if (Array.isArray(value.path) && value.path.length > 0) {
                    if (value.path[0].response) {
                        path = value.path[0].response.data;
                    }
                }
                if (!path) return message.warn('请先等待上传完成！', 2);
                await this.props.dispatch({
                    type: 'reportList/add',
                    payload: {
                        ...value,
                        path,
                    },
                })
            }
            this.handleCancel();
        })
    }

    render() {
        const { visible, form, loading, addLoading, updateLoading, isEdit, current } = this.props;
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                title={isEdit ? '编辑检测报告' : '上传检测报告'}
                confirmLoading={isEdit ? updateLoading : addLoading}
                width={800}
                bodyStyle={{ padding: 0, minHeight: 200 }}
                onOk={this.handleSubmit}
            >
                <Spin spinning={loading}>
                    <DataContext.Provider value={{ form, isEdit, current }}>
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
        loading: state.loading.effects['reportList/fetchItem'] || false,
        addLoading: state.loading.effects['reportList/add'] || false,
        updateLoading: state.loading.effects['reportList/update'] || false,
    })
)(
    Form.create()(ExampleModal)
);
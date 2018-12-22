import React, { lazy, Suspense } from 'react';
import { Modal, Form, Spin } from 'antd';
import { connect } from 'dva';
import rebuild from '@/utils/rebuild';
import DataContext from './common/DataContext';
import { dateFormat } from './common/config';
import ModalContent from './ModalContent';

@rebuild({
    beforeOpen: (props) => {
        props.dispatch({
            type: 'reportList/fetchItem',
            payload: props.id
        })
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
            type: 'reportList/toggleCheckModalVisible',
            payload: { visible: false },
        })
    }
    render() {
        const { visible, form, loading, isView, current } = this.props;
        return (
            <Modal
                title={null}
                footer={null}
                visible={visible}
                width={800}
                onCancel={this.handleCancel}
                bodyStyle={{ padding: 0, minHeight: 200 }}
            >
                <DataContext.Provider value={{ form, isView, current }}>
                    <ModalContent loading={loading} />
                </DataContext.Provider>
            </Modal>
        )
    }
}

export default connect(
    (state) => ({
        visible: state.reportList.checkModalVisible,
        current: state.reportList.current,
        id: state.reportList.id,
        isView: !!state.reportList.current.examiningResult,
        loading: state.loading.effects['reportList/fetchItem'] || false,
    })
)(
    Form.create()(ExampleModal)
);
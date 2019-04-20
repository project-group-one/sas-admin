import React, { lazy, Suspense } from 'react';
import { Modal, Form, Spin, message } from 'antd';
import { connect } from 'dva';
import rebuild from '@/utils/rebuild';
import DataContext from './common/DataContext';
import { dateFormat } from './common/config';
import ModalContent from './ModalContent';

@rebuild({
  beforeOpen: props => {
    if (props.isEdit) {
      props.dispatch({
        type: 'picture/fetchItem',
        payload: props.id,
      });
    }
  },
  afterClose: props => {
    props.dispatch({
      type: 'picture/clearCurrent',
    });
  },
})
class ExampleModal extends React.PureComponent {
  handleCancel = () => {
    this.props.dispatch({
      type: 'picture/toggleDetailModalVisible',
      payload: { visible: false },
    });
  };

  handleSubmit = () => {
    const { form, current, isEdit } = this.props;
    form.validateFieldsAndScroll(async (errors, value) => {
      if (errors) return;
      if (isEdit) {
        await this.props.dispatch({
          type: 'picture/update',
          payload: {
            ...current,
            ...value,
          },
        });
      } else {
        await this.props.dispatch({
          type: 'picture/add',
          payload: {
            ...value,
          },
        });
      }
      this.handleCancel();
    });
  };

  render() {
    const { visible, form, loading, addLoading, updateLoading, isEdit, current } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={this.handleCancel}
        title={isEdit ? '编辑焦点图' : '添加焦点图'}
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
    );
  }
}

export default connect(state => ({
  visible: state.picture.detailModalVisible,
  current: state.picture.current,
  id: state.picture.id,
  isEdit: typeof state.picture.id !== 'undefined',
  loading: state.loading.effects['picture/fetchItem'] || false,
  addLoading: state.loading.effects['picture/add'] || false,
  updateLoading: state.loading.effects['picture/update'] || false,
}))(Form.create()(ExampleModal));

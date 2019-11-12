import React, { lazy, Suspense } from 'react';
import { Modal, Form, Spin, message } from 'antd';
import { connect } from 'dva';
import rebuild from '@/utils/rebuild';
import DataContext from './common/DataContext';
import { dateFormat } from './common/config';
import ModalContent from './ModalContent';

@rebuild({
  beforeOpen: props => {},
  afterClose: props => {
    props.dispatch({
      type: 'foodType/clearCurrent',
    });
  },
})
class ExampleModal extends React.PureComponent {
  handleCancel = () => {
    this.props.dispatch({
      type: 'foodType/setState',
      payload: { detailModalVisible: false },
    });
  };

  handleSubmit = () => {
    const { form, current, isEdit } = this.props;
    form.validateFieldsAndScroll(async (errors, value) => {
      if (errors) return;
      if (isEdit) {
        await this.props.dispatch({
          type: 'foodType/update',
          payload: {
            ...current,
            ...value,
          },
        });
      } else {
        await this.props.dispatch({
          type: 'foodType/add',
          payload: {
            parentId: current.key,
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
        title={isEdit ? '编辑食品类型' : '添加食品类型'}
        confirmLoading={isEdit ? updateLoading : addLoading}
        width={600}
        onOk={this.handleSubmit}
        maskClosable={false}
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
  visible: state.foodType.detailModalVisible,
  current: state.foodType.currentNode,
  id: state.foodType.id,
  isEdit: state.foodType.isEdit,
  loading: state.loading.effects['foodType/fetchItem'] || false,
  addLoading: state.loading.effects['foodType/add'] || false,
  updateLoading: state.loading.effects['foodType/update'] || false,
}))(Form.create()(ExampleModal));

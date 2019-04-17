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
        type: 'news/fetchItem',
        payload: props.id,
      });
    }
  },
  afterClose: props => {
    props.dispatch({
      type: 'news/clearCurrent',
    });
  },
})
class ExampleModal extends React.PureComponent {
  handleCancel = () => {
    this.props.dispatch({
      type: 'news/toggleDetailModalVisible',
      payload: { visible: false },
    });
  };

  handleSubmit = () => {
    const { form, current, isEdit } = this.props;
    form.validateFieldsAndScroll(async (errors, value) => {
      if (errors) return;
      if (isEdit) {
        await this.props.dispatch({
          type: 'news/update',
          payload: {
            ...current,
            ...value,
          },
        });
      } else {
        await this.props.dispatch({
          type: 'news/add',
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
        title={isEdit ? '编辑新闻' : '添加新闻'}
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
  visible: state.news.detailModalVisible,
  current: state.news.current,
  id: state.news.id,
  isEdit: typeof state.news.id !== 'undefined',
  loading: state.loading.effects['news/fetchItem'] || false,
  addLoading: state.loading.effects['news/add'] || false,
  updateLoading: state.loading.effects['news/update'] || false,
}))(Form.create()(ExampleModal));

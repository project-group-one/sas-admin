import React from 'react';
import { Modal, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';

const { TextArea } = Input;
const FormItem = Form.Item;

const AuditModal = ({}) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.organization.auditModalVisible);
  const handleCancel = () => {
    dispatch({
      type: 'organization/set',
      payload: {
        auditModalVisible: false,
        current: {},
      },
    });
  };
  return (
    <Modal
      visible={visible}
      okText={'审核通过'}
      cancelText={'审核驳回'}
      onOk={() => {}}
      onCancel={handleCancel}
    >
      <FormItem label="材料" colon={false}>
        <img src="" alt="" />
      </FormItem>

      <FormItem label="驳回原因" colon={false}>
        <TextArea style={{ height: 200 }} placeholder="审核驳回时请填写原因" />
      </FormItem>
    </Modal>
  );
};

export default AuditModal;

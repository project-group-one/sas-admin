import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { useDispatch } from 'dva';

const FormItem = Form.Item;

const AuditModal = ({ visible, onCancel, targetUser }) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (visible && targetUser) {
        dispatch({
          type: 'users/getUserAuditDetail',
          payload: targetUser.id,
        });
      }
    },
    [visible, targetUser]
  );

  return (
    <Modal
      visible={visible}
      okText={'审核通过'}
      // cancelText={'审核驳回'}
      onOk={() => {
        dispatch({
          type: 'users/userAudit',
          payload: targetUser.id,
        });
      }}
      onCancel={onCancel}
    >
      <FormItem label={'身份证正面'}>
        <img src="" alt="" />
      </FormItem>
      <FormItem label={'身份证反面'}>
        <img src="" alt="" />
      </FormItem>
    </Modal>
  );
};

export default AuditModal;

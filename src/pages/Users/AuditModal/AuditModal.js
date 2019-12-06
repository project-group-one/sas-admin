import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { filePath } from '@/constants';

const FormItem = Form.Item;

const AuditModal = ({ visible, onCancel, targetUser = {} }) => {
  const dispatch = useDispatch();
  const userAuditDetail = useSelector(state => state.users.userAuditDetail);
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
      width={550}
      // cancelText={'审核驳回'}
      onOk={() => {
        dispatch({
          type: 'users/userAudit',
          payload: userAuditDetail.id,
        });
      }}
      onCancel={onCancel}
    >
      <FormItem label={'身份证正面'}>
        <img
          style={{ width: 500, height: 200 }}
          src={`${filePath}${userAuditDetail.frontPath}`}
          alt=""
        />
      </FormItem>
      <FormItem label={'身份证反面'}>
        <img
          style={{ width: 500, height: 200 }}
          src={`${filePath}${userAuditDetail.backPath}`}
          alt=""
        />
      </FormItem>
    </Modal>
  );
};

export default AuditModal;

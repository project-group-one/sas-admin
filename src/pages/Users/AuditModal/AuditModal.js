import React from 'react';
import { Modal } from 'antd';

const AuditModal = ({ visible, onCancel, targetUser }) => {
  return (
    <Modal
      visible={visible}
      okText={'审核通过'}
      cancelText={'审核驳回'}
      onOk={() => {}}
      onCancel={onCancel}
    >
      <img src="" alt="" />
    </Modal>
  );
};

export default AuditModal;

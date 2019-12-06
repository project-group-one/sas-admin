import React from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { filePath } from '@/constants';

const { TextArea } = Input;
const FormItem = Form.Item;

const AuditModal = ({ form }) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.organization.auditModalVisible);
  const current = useSelector(state => state.organization.current);

  const submit = status => {
    form.validateFieldsAndScroll(status !== 'SUCCESS' ? ['errorMsg'] : [], (error, value) => {
      if (error) return;
      dispatch({
        type: 'organization/auditOrganization',
        payload: {
          ...value,
          status,
        },
      }).then(() => {
        handleCancel();
      });
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'organization/set',
      payload: {
        auditModalVisible: false,
        current: {},
      },
    });
  };

  const handleReject = () => {
    submit('FAIL');
  };
  const handlePass = () => {
    submit('SUCCESS');
  };
  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 10 }} onClick={handleReject}>
            审核驳回
          </Button>
          <Button onClick={handlePass} type="primary">
            审核通过
          </Button>
        </div>
      }
    >
      <FormItem label="材料" colon={false}>
        <img
          style={{ maxHeight: 400, maxWidth: 500 }}
          src={`${filePath}${current.credential}`}
          alt=""
        />
      </FormItem>

      <FormItem label="驳回原因" colon={false}>
        {form.getFieldDecorator('errorMsg', {
          rules: [{ required: true, message: '请输入驳回原因' }],
        })(<TextArea style={{ height: 200 }} placeholder="审核驳回时请填写原因" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(AuditModal);

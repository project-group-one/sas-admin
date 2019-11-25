import React from 'react';
import { Modal, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';

const { TextArea } = Input;
const FormItem = Form.Item;

const AuditModal = ({ form }) => {
  const dispatch = useDispatch();
  const visible = useSelector(state => state.organization.auditModalVisible);

  const submit = status => {
    form.validateFieldsAndScroll((error, value) => {
      if (error) return;
      dispatch({
        type: 'organization/auditOrganization',
        payload: {
          ...value,
          status,
        },
      }).then(() => {
        dispatch({
          type: 'organization/set',
          payload: {
            auditModalVisible: false,
            current: {},
          },
        });
      });
    });
  };

  const handleCancel = () => {
    submit('SUCCESS');
  };
  const handleOk = () => {
    submit('FAIL');
  };
  return (
    <Modal
      visible={visible}
      okText={'审核通过'}
      cancelText={'审核驳回'}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <FormItem label="材料" colon={false}>
        <img src="" alt="" />
      </FormItem>

      <FormItem label="驳回原因" colon={false}>
        {form.getFieldDecorator('errorMsg', {
          rules: [{ required: true, message: '请输入组织名称' }],
        })(<TextArea style={{ height: 200 }} placeholder="审核驳回时请填写原因" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(AuditModal);

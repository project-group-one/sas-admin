import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;

const Detail = ({ form }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <Form>
        <FormItem {...formItemLayout} label="产品种类">
          {form.getFieldDecorator('title1', {
            rules: [{ required: false, message: '请输入产品种类' }],
            initialValue: undefined,
          })(<TextArea disabled={!isEdit} placeholder="请输入产品种类" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="抽检依据">
          {form.getFieldDecorator('title2', {
            rules: [{ required: false, message: '请输入抽检依据' }],
            initialValue: undefined,
          })(<TextArea disabled={!isEdit} placeholder="请输入抽检依据" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="抽检要求">
          {form.getFieldDecorator('title3', {
            rules: [{ required: false, message: '请输入抽检要求' }],
            initialValue: undefined,
          })(<TextArea disabled={!isEdit} placeholder="请输入抽检要求" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label=" " colon={false}>
          <div style={{ textAlign: 'right' }}>
            {isEdit ? (
              <>
                <Button
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    form.resetFields();
                    setIsEdit(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: 'foodType/saveRegulation',
                      payload: {},
                    });
                  }}
                >
                  保存
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setIsEdit(true);
                }}
                type="primary"
              >
                编辑
              </Button>
            )}
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(Detail);

import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;

const Detail = ({ form }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const regulation = useSelector(state => state.foodType.regulation);
  const currentNode = useSelector(state => state.foodType.currentNode);
  const updateLoading = useSelector(state => state.loading.effects['foodType/updateRegulation']);

  useEffect(
    () => {
      form.resetFields();
    },
    [regulation]
  );

  const handleSave = () => {
    form.validateFieldsAndScroll((error, value) => {
      if (error) return;
      dispatch({
        type: 'foodType/updateRegulation',
        payload: {
          ...value,
          typeId: currentNode.key,
        },
      }).then(() => {
        setIsEdit(false);
      });
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <Form>
        {form.getFieldDecorator('id', {
          initialValue: regulation.id,
        })(<Input type="hidden" />)}
        <FormItem {...formItemLayout} label="产品种类">
          {form.getFieldDecorator('category', {
            rules: [{ required: false, message: '请输入产品种类' }],
            initialValue: regulation.category,
          })(<TextArea disabled={!isEdit} placeholder="请输入产品种类" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="抽检依据">
          {form.getFieldDecorator('samplingBasis', {
            rules: [{ required: false, message: '请输入抽检依据' }],
            initialValue: regulation.samplingBasis,
          })(<TextArea disabled={!isEdit} placeholder="请输入抽检依据" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="抽检要求">
          {form.getFieldDecorator('demand', {
            rules: [{ required: false, message: '请输入抽检要求' }],
            initialValue: regulation.demand,
          })(<TextArea disabled={!isEdit} placeholder="请输入抽检要求" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="注意事项">
          {form.getFieldDecorator('attention', {
            rules: [{ required: false, message: '请输入注意事项' }],
            initialValue: regulation.attention,
          })(<TextArea disabled={!isEdit} placeholder="请输入注意事项" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="判断原则">
          {form.getFieldDecorator('conclusion', {
            rules: [{ required: false, message: '请输入判断原则' }],
            initialValue: regulation.conclusion,
          })(<TextArea disabled={!isEdit} placeholder="请输入判断原则" style={{ height: 120 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="适用范围">
          {form.getFieldDecorator('range', {
            rules: [{ required: false, message: '请输入适用范围' }],
            initialValue: regulation.range,
          })(<TextArea disabled={!isEdit} placeholder="请输入适用范围" style={{ height: 120 }} />)}
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
                  disabled={updateLoading}
                  loading={updateLoading}
                  type="primary"
                  onClick={handleSave}
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

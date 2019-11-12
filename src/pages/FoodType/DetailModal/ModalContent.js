import React, { useContext } from 'react';
import DataContext from './common/DataContext';
import { Upload, Button, Icon, Form, Input, Row, Col } from 'antd';

import styles from './index.less';
import { useSelector } from 'dva';

const FormItem = Form.Item;

const ModalContent = ({}) => {
  const { form, current, isEdit } = useContext(DataContext);
  const currentNode = useSelector(state => {
    console.log(state.foodType, 12312);
    return state.foodType.currentNode || {};
  });
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Form>
      {!isEdit && (
        <FormItem {...formItemLayout} label="所属类型">
          {currentNode.title}
        </FormItem>
      )}
      <FormItem {...formItemLayout} label="食品类型">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请输入食品类型' }],
          initialValue: isEdit ? currentNode.title : undefined,
        })(<Input placeholder="请输入食品类型" />)}
      </FormItem>
    </Form>
  );
};

export default ModalContent;

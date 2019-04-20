import React from 'react';
import { Upload, Button, Icon, Form, Input, Row, Col } from 'antd';
import DataContext from './common/DataContext';
import { ROOT_PATH } from '@/utils/request';

const FormItem = Form.Item;

class ModalContent extends React.PureComponent {
  static contextType = DataContext;

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && [e.file];
  };

  handleFileRemove = file => {
    const { form } = this.context;
    form.setFieldsValue({
      path: undefined,
    });
  };

  handleFileChange = value => {
    const { form } = this.context;
    form.setFieldsValue({
      name: value.file.name,
    });
  };

  render() {
    const { form, isEdit, current } = this.context;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 9 },
    };
    // "createDate": "2019-04-19T02:04:17.633Z",
    // "id": 0,
    // "name": "string"
    return (
      <div style={{ paddingTop: 30 }}>
        <FormItem {...formItemLayout} label="组织名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入组织名称' }],
            initialValue: current.name,
          })(<Input placeholder="请输入组织名称" />)}
        </FormItem>
      </div>
    );
  }
}

export default ModalContent;

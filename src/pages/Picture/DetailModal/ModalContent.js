import React from 'react';
import {
  Upload,
  Button,
  Icon,
  Form,
  Input,
  Row,
  Col,
} from 'antd';
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
    //         "author": "string",
    //   "content": "string",
    //   "imgUrl": "string",
    //   "keywords": "string",
    //   "source": "string",
    //   "storeUrl": "string",
    //   "summary": "string",
    //   "title": "string",
    //   "type": 0
    return (
      <div style={{ paddingTop: 30 }}>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
            initialValue: current.title,
          })(<Input placeholder="请输入标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '请输入作者' }],
            initialValue: current.author,
          })(<Input placeholder="请输入作者" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="来源">
          {getFieldDecorator('source', {
            rules: [{ required: false, message: '请输入来源' }],
            initialValue: current.source,
          })(<Input placeholder="请输入来源" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="图片">
          {getFieldDecorator('imgUrl', {
            rules: [{ required: false, message: '请输入图片' }],
            initialValue: current.imgUrl,
          })(<Input placeholder="请输入图片" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容' }],
            initialValue: current.content,
          })(<Input.TextArea rows={5} placeholder="请输入内容" />)}
        </FormItem>
      </div>
    );
  }
}

export default ModalContent;

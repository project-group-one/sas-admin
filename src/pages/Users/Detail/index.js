import React, { Component } from 'react';
import { Modal, Form } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class UserDetail extends Component {
  render() {
    return (
      <Modal visible={true}>
        <Form>
          <Form.Item label="姓名" {...formItemLayout}>
            <span>123</span>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default UserDetail;

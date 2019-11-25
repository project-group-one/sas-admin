import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@connect(({ users }) => ({
  visible: users.editModalVisible,
  user: users.user,
}))
class UserEdit extends Component {
  handleCancel = () => {
    this.props.dispatch({
      type: 'users/setEditModalVisible',
      payload: false,
    });
    this.props.dispatch({
      type: 'users/setUser',
      payload: {},
    });
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { user, dispatch } = this.props;
        dispatch({
          type: 'users/updateUser',
          payload: {
            id: user ? user.id : undefined,
            ...value,
          },
        });
      }
    });
  };

  render() {
    const { visible, user, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        width={600}
        title={user.id ? '编辑用户' : '添加用户'}
        maskClosable={false}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        <Form>
          <Form.Item {...formItemLayout} label="用户名" required>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
              initialValue: user.username,
            })(<Input placeholder="请输入用户名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码" required>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
              ],
              initialValue: user.password,
            })(<Input placeholder="请输入密码" type="password" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="类型" required>
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择类型',
                },
              ],
              initialValue: user.type,
            })(
              <Select placeholder="请选择类型">
                <Select.Option value={0}>普通用户</Select.Option>
                <Select.Option value={1}>单位操作员</Select.Option>
                <Select.Option value={2}>审核员</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="登录权限" required>
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: '请选择登录权限',
                },
              ],
              initialValue: user.status,
            })(
              <Select placeholder="请选择登录权限">
                <Select.Option value={0}>启用</Select.Option>
                <Select.Option value={1}>禁用</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="姓名" required>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
              initialValue: user.name,
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="地址" required>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '请输入地址',
                },
              ],
              initialValue: user.address,
            })(<Input placeholder="请输入地址" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="电话" required>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入电话',
                },
              ],
              initialValue: user.phone,
            })(<Input placeholder="请输入电话" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(UserEdit);

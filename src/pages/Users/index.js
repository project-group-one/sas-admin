import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Input, Divider, Switch, Modal } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AuditModal from './AuditModal';

import UserEdit from './Edit';

import styles from './index.less';

const getText = verifyStatus => {
  return verifyStatus === 0 ? (
    <span style={{ color: 'red' }}>未审核</span>
  ) : (
    <span style={{ color: 'green' }}>已审核</span>
  );
};

@connect(({ loading, users, global }) => ({
  data: users.list,
  queryParams: users.queryParams,
  currentUser: global.currentUser,
  total: users.total,
  loading: loading.effects['news/getUserList'],
}))
class Users extends Component {
  state = {
    auditModalVisible: false,
    targetUser: undefined,
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '电话号码',
      dataIndex: 'tel',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      sorter: true,
      render: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (value, record) => (
        <React.Fragment>
          <a onClick={() => this.handleEdit(record.id)}>编辑</a>
          <Divider type="vertical" />
          {record.verifyStatus === 1 ? (
            <>
              <a
                onClick={() => {
                  this.setState({ auditModalVisible: true, targetUser: record });
                }}
              >
                审核
              </a>
            </>
          ) : (
            getText(record.verifyStatus)
          )}
          <Divider type="vertical" />
          {this.props.currentUser.id !== record.id && (
            <Switch
              checked={record.status === 0}
              checkedChildren="启用"
              unCheckedChildren="冻结"
              onChange={checked => {
                Modal.confirm({
                  title: `是否确定${!checked ? '冻结' : '启用'}该用户？`,
                  onOk: () => {
                    this.props.dispatch({
                      type: 'users/toggleUserStatus',
                      payload: {
                        targetUserId: record.id,
                        enabled: checked,
                      },
                    });
                  },
                });
              }}
            />
          )}
          {this.props.currentUser.id !== record.id && (
            <>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  Modal.confirm({
                    title: '是否确认删除?',
                    onOk: async () => {
                      await this.props.dispatch({
                        type: 'users/remove',
                        payload: record.id,
                      });
                    },
                  });
                }}
              >
                删除
              </a>
            </>
          )}
        </React.Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.query({});
  }

  query = conditions => {
    this.props.dispatch({
      type: 'users/getUserList',
      payload: conditions,
    });
  };

  handleSearch = (value, field) => {
    this.query({ [field]: value });
  };

  handleEdit = id => {
    if (id) {
      this.props.dispatch({
        type: 'users/getUser',
        payload: id,
      });
    }
    this.props.dispatch({
      type: 'users/setEditModalVisible',
      payload: true,
    });
  };

  render() {
    const { data, loading, queryParams, total } = this.props;
    const { auditModalVisible, targetUser } = this.state;
    const pagination = {
      current: queryParams.current,
      pageSize: queryParams.pageSize,
      total,
      showTotal: total => `共${total}条`,
      showSizeChanger: true,
      showQuickJumper: true,
    };

    return (
      <PageHeaderWrapper title="用户">
        <Card bordered={false}>
          <div className={styles['header-bar']}>
            <div className="filter-bar">
              <Input.Search
                placeholder="请输入姓名"
                style={{ width: 212 }}
                onPressEnter={e => this.handleSearch(e.target.value, 'name')}
              />
            </div>
            <div className="action-bar">
              <Button type="primary" icon="plus" onClick={() => this.handleEdit()}>
                添加
              </Button>
            </div>
          </div>
          <div className={styles['table-wrapper']}>
            <Table
              rowKey="id"
              loading={loading}
              columns={this.columns}
              dataSource={data}
              pagination={pagination}
              onChange={(pagination, filters, sorter) => {
                this.query({ ...pagination, ...filters });
              }}
            />
          </div>
        </Card>
        <UserEdit />
        <AuditModal
          visible={auditModalVisible}
          targetUser={targetUser}
          onCancel={() => this.setState({ auditModalVisible: false })}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Users;

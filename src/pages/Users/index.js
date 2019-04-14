import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Input, Divider } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import UserEdit from './Edit';

import styles from './index.less';

@connect(({ loading, users }) => ({
  data: users.list,
  queryParams: users.queryParams,
  total: users.total,
  loading: loading.effects['news/getUserList'],
}))
class Users extends Component {
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
      render: (value, record) => (
        <React.Fragment>
          <a onClick={() => this.handleEdit(record.id)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => {}}>删除</a>
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
              <Button type="primary" icon="plus" onClick={this.handleEdit}>
                添加
              </Button>
            </div>
          </div>
          <div className={styles['table-wrapper']}>
            <Table
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
      </PageHeaderWrapper>
    );
  }
}

export default Users;

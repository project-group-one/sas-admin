import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    Modal,
    Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DetailModal from './DetailModal';
import CheckModal from './CheckModal';
import CommentModal from './CommentModal';

import styles from './List.less';

const FormItem = Form.Item;
const { Option } = Select;

const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');

@connect(({ reportList, loading }) => ({
    data: reportList.data,
    loading: loading.effects['reportList/fetch'],
}))
@Form.create()
class TableList extends PureComponent {
    state = {
        selectedRows: [],
        formValues: {},
    };

    columns = [
        {
            title: '检测报告名称',
            dataIndex: 'name',
            render: (text, { path }) => <a href={path}>{text}</a>
        },
        {
            title: '上传时间',
            dataIndex: 'createdDate',
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleCheckModalVisible(true, record.id)}>
                    {record.examiningResult ? <font color={'green'}>检测结果</font> : '检测'}
                    </a>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleCommentModalVisible(true, record.id)}>{record.evaluation ? '查看评价': '评价'}</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.handleDetailModalVisible(true, record.id)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={this.handleRemove(record.id)}>删除</a>
                </Fragment>
            ),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reportList/fetch',
        });
    }

    handleRemove = (id) => () => {
        Modal.confirm({
            title: '是否确认删除?',
            onOk: () => {
                this.props.dispatch({
                    type: 'reportList/remove',
                    payload: id,
                })
            },
        })
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'reportList/fetch',
            payload: params,
        });
    };

    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;

        if (selectedRows.length === 0) return;
        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'rule/remove',
                    payload: {
                        key: selectedRows.map(row => row.key),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            default:
                break;
        }
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'reportList/fetch',
                payload: values,
            });
        });
    };

    handleFormReset = () => {
        this.setState({
            formValues: {},
        });
        this.props.dispatch({
            type: 'reportList/fetch',
            payload: {},
        });
    }

    handleDetailModalVisible = (visible, id) => {
        this.props.dispatch({
            type: 'reportList/toggleDetailModalVisible',
            payload: { visible, id },
        })
    }

    handleCheckModalVisible = (visible, id) => {
        this.props.dispatch({
            type: 'reportList/toggleCheckModalVisible',
            payload: { visible, id },
        })
    }

    handleCommentModalVisible = (visible, id) => {
        this.props.dispatch({
            type: 'reportList/toggleCommentModalVisible',
            payload: { visible, id },
        })
    }

    renderSimpleForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="规则名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="报告类型">
                            {getFieldDecorator('type')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="type0">类型一</Option>
                                    <Option value="type1">类型二</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderForm() {
        return this.renderSimpleForm();
    }

    render() {
        const {
            data,
            loading,
        } = this.props;
        const { selectedRows } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );
        return (
            <PageHeaderWrapper title="检测报告">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleDetailModalVisible(true)}>
                                新建
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Button>批量操作</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <DetailModal />
                <CheckModal />
                <CommentModal />
            </PageHeaderWrapper>
        );
    }
}

export default TableList;

import React from 'react';
import { Tabs, Row, Col, Card, Button, Icon, Skeleton } from 'antd';
import { connect } from 'dva';
import DataContext from './common/DataContext';
import Result from '@/components/Result';

const { TabPane } = Tabs;
const types = {
    SUCCESS: 'success',
    ERROR: 'error',
    CHECKING: 'checking',
}

@connect()
class ModalContent extends React.PureComponent {
    state = {
        type: '',
        message: '',
    }

    handleCheck = async () => {
        this.setState({ type: types.CHECKING });
        const result = await this.props.dispatch({
            type: 'reportList/check',
        });
        const type = result.success ? types.SUCCESS : types.ERROR;
        this.setState({
            type,
            message: result.msg,
        })
    }

    renderTitle = () => {
        const { type } = this.state;
        switch (type) {
            case types.SUCCESS:
                return '检测成功';
            case types.ERROR:
                return '检测失败';
            case types.CHECKING:
                return <Button icon='loading'>检测中</Button>;
            default:
                return <Button onClick={this.handleCheck}>点击检测</Button>;
        }
    }

    handleCancel = () => {
        this.props.dispatch({
            type: 'reportList/toggleCheckModalVisible',
            payload: { visible: false },
        })
    }

    render() {
        const { type, message } = this.state;
        const { loading } = this.props;
        const actions = <Button onClick={this.handleCancel} type="primary">返回</Button>;
        return (
            <DataContext.Consumer>
                {
                    ({ isView, current }) => {
                        const extra = (
                            <div>
                                <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500, marginBottom: 16 }}>
                                    您提交的报告检测结果：
                                </div>
                                <div>
                                    {isView ? current.examiningResult : message}
                                </div>
                            </div>
                        );
                        return (
                            <div style={{ padding: 20 }}>
                                {
                                    loading ? (
                                        <Skeleton active />
                                    ) : (
                                            <Result
                                                type={isView === false ? type : undefined}
                                                title={isView === false ? this.renderTitle() : undefined}
                                                extra={extra}
                                                actions={actions}
                                                style={{ width: '100%' }}
                                            />
                                        )
                                }
                            </div>
                        )
                    }
                }
            </DataContext.Consumer>
        )
    }
}

export default ModalContent;

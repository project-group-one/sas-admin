import React from 'react';
import { Tabs, Row, Col, Card, Button, Icon } from 'antd';
import Result from '@/components/Result';

const { TabPane } = Tabs;
const types = {
    SUCCESS: 'success',
    ERROR: 'error',
    CHECKING: 'checking',
}
class ModalContent extends React.PureComponent {

    state = {
        type: '',
    }

    handleTabChange = () => {

    }

    handleCheck = () => {
        this.setState({ type: types.CHECKING });
        setTimeout(() => {
            this.setState({ type: types.SUCCESS });
        }, 2000)
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

    render() {
        const { type } = this.state;
        const extra = (
            <div>
                <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500, marginBottom: 16 }}>
                    您提交的报告检测结果：
              </div>
                <div style={{ marginBottom: 16 }}>
                    <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle" />您的账户已被冻结
                <a style={{ marginLeft: 16 }}>立即解冻 <Icon type="right" /></a>
                </div>
                <div>
                    <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle" />您的账户还不具备申请资格
                <a style={{ marginLeft: 16 }}>立即升级 <Icon type="right" /></a>
                </div>
            </div>
        );

        const actions = <Button type="primary">返回修改</Button>;
        return (
            <div style={{ padding: 20 }}>
                <Result
                    type={type}
                    title={this.renderTitle()}
                    description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示“单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
                    extra={extra}
                    actions={actions}
                    style={{ width: '100%' }}
                />
            </div>
        )
    }
}

export default ModalContent;

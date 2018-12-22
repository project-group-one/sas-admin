import React from 'react';
import { Input } from 'antd';
import DataContext from './common/DataContext';
const { TextArea } = Input;

class ModalContent extends React.PureComponent {
    static contextType = DataContext;

    render() {
        const { current, isEdit, form } = this.context;
        const { getFieldDecorator } = form;
        return (
            <div style={{ padding: 20 }}>
                {getFieldDecorator('evaluation', {
                    rules: [
                        { required: true, message: '评价内容不能为空' },
                    ],
                    initialValue: current.evaluation
                })(
                    <TextArea
                        rows={6}
                        placeholder='请输入评价内容'
                    />
                )}
            </div>
        )
    }
}

export default ModalContent;

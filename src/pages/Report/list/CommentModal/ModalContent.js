import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

class ModalContent extends React.PureComponent {

    render() {
        return (
            <div style={{ padding: 20 }}>
                <TextArea
                    rows={6}
                    placeholder='请输入评价内容'
                />
            </div>
        )
    }
}

export default ModalContent;

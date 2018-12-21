import React from 'react';
import { Upload, Button, Icon, Form, Input } from 'antd';
import DataContext from './common/DataContext';

const FormItem = Form.Item;

class ModalContent extends React.PureComponent {

    static contextType = DataContext;

    render() {
        const { form, idEdit } = this.context;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        return (
            <div style={{ paddingTop: 30 }}>
                <FormItem
                    {...formItemLayout}
                    label="上传报告"
                >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="报告名称"
                >
                    {getFieldDecorator('name', {

                    })(
                        <Input placeholder='请输入报告名称' />
                    )}
                </FormItem>
            </div>
        )
    }
}

export default ModalContent;

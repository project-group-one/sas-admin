import React from 'react';
import { Upload, Button, Icon, Form, Input } from 'antd';
import DataContext from './common/DataContext';
import { ROOT_PATH } from '@/utils/request';

const FormItem = Form.Item;

class ModalContent extends React.PureComponent {

    static contextType = DataContext;

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && [e.file];
    }

    handleFileRemove = (file) => {
        const { form } = this.context;
        form.setFieldsValue({
            path: undefined
        });
    }

    handleFileChange = (value) => {
        const { form } = this.context;
        form.setFieldsValue({
            name: value.file.name
        });
    }

    render() {
        const { form, isEdit, current } = this.context;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 9 },
        };
        return (
            <div style={{ paddingTop: 30 }}>
                {
                    isEdit
                        ? null
                        : <FormItem
                            {...formItemLayout}
                            label="上传报告"
                        >
                            {getFieldDecorator('path', {
                                rules: [
                                    { required: true, message: '请上传检测报告' },
                                ],
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                onChange: this.handleFileChange,
                            })(
                                <Upload
                                    name="file"
                                    action={`${ROOT_PATH}/api/files`}
                                    listType="picture"
                                    onRemove={this.handleFileRemove}
                                >
                                    <Button>
                                        <Icon type="upload" /> 点击上传
                            </Button>
                                </Upload>
                            )}
                        </FormItem>
                }
                <FormItem
                    {...formItemLayout}
                    label="报告名称"
                >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入报告名称' },
                        ],
                        initialValue: current.name
                    })(
                        <Input placeholder='请输入报告名称' />
                    )}
                </FormItem>
            </div>
        )
    }
}

export default ModalContent;

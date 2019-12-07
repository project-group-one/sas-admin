import React from 'react';
import { Upload, Button, Icon, Form, Input, Row, Col, Radio, message } from 'antd';
import DataContext from './common/DataContext';
import { ROOT_PATH } from '@/utils/request';
import styles from './index.less';
import { filePath } from '@/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const imageTypes = ['jpeg', 'jpg', 'png', 'gif'];
const accessToken = localStorage.getItem('accessToken');

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isAllowed = imageTypes.map(type => `image/${type}`).includes(file.type);
  if (!isAllowed) {
    message.error(`你只能上传 ${imageTypes.join('/')} 类型的图片!`);
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于2MB!');
  }
  return isAllowed && isLt2M;
}

class ModalContent extends React.PureComponent {
  static contextType = DataContext;
  state = {
    loading: false,
    imageUrl: undefined,
  };

  normFile = e => {
    const { file } = e;
    if (file.response) {
      return file.response ? file.response.data : undefined;
    }
    return;
  };

  handleFileRemove = file => {
    const { form } = this.context;
    form.setFieldsValue({
      path: undefined,
    });
  };

  // handleFileChange = value => {
  //   const { form } = this.context;
  //   form.setFieldsValue({
  //     imgUrl: value.file.name,
  //   });
  // };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
      // this.context.form.setFieldsValue({
      //   imgUrl: info.file.response.data,
      // });
    }
  };

  render() {
    const { loading } = this.state;
    const { form, isEdit, current } = this.context;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 13 },
    };
    const imageUrl = this.state.imageUrl || current.imgUrl;
    // {
    //   "createDate": "2019-04-18T12:52:23.481Z",
    //   "creator": 0,
    //   "id": 0,
    //   "imgUrl": "string",
    //   "name": "string",
    //   "type": 0
    // }
    return (
      <div style={{ paddingTop: 30 }}>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入标题' }],
            initialValue: current.name,
          })(<Input placeholder="请输入标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="焦点图">
          {getFieldDecorator('imgUrl', {
            rules: [{ required: true, message: '请上传焦点图' }],
            // valuePropName: 'fileList',
            initialValue: current.imgUrl,
            getValueFromEvent: this.normFile,
            // onChange: this.handleFileChange,
          })(
            <Upload
              name="file"
              action={`${ROOT_PATH}/api/files`}
              listType="picture-card"
              className={styles['avatar-uploader']}
              showUploadList={false}
              onChange={this.handleChange}
              beforeUpload={beforeUpload}
              headers={{
                Authorization: `Bearer ${accessToken}`,
              }}
            >
              {imageUrl ? (
                <img
                  style={{ maxWidth: 400, maxHeight: 300 }}
                  src={this.state.imageUrl ? imageUrl : `${filePath}${imageUrl}`}
                  alt="avatar"
                />
              ) : (
                <div>
                  <Icon type={loading ? 'loading' : 'plus'} />
                  <div className={styles['ant-upload-text']}>点击上传</div>
                </div>
              )}
            </Upload>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择类型' }],
            initialValue: current.content || 0,
          })(
            <RadioGroup>
              <Radio value={0}>大图</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="跳转链接">
          {getFieldDecorator('url', {
            rules: [{ required: false, message: '请填写跳转链接' }],
            initialValue: current.url,
          })(<Input placeholder={'请填写跳转链接'} />)}
        </FormItem>
      </div>
    );
  }
}

export default ModalContent;

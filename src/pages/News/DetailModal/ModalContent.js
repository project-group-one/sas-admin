import React from 'react';
import { Upload, Button, Icon, Form, Input, Row, Col } from 'antd';
import DataContext from './common/DataContext';
import { ROOT_PATH } from '@/utils/request';
import { filePath } from '@/constants';
import RichEditor from '@/components/RichEditor';

import styles from './index.less';

const FormItem = Form.Item;
const accessToken = localStorage.getItem('accessToken');
const imageTypes = ['jpeg', 'jpg', 'png', 'gif'];

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
    imageUrl: undefined,
    loading: false,
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
    const imageUrl = this.state.imageUrl || current.imgUrl;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ paddingTop: 30 }}>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
            initialValue: current.title,
          })(<Input style={{ width: 250 }} placeholder="请输入标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '请输入作者' }],
            initialValue: current.author,
          })(<Input style={{ width: 250 }} placeholder="请输入作者" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="来源">
          {getFieldDecorator('source', {
            rules: [{ required: false, message: '请输入来源' }],
            initialValue: current.source,
          })(<Input style={{ width: 250 }} placeholder="请输入来源" />)}
        </FormItem>
        {/* <FormItem {...formItemLayout} label="图片">
          {getFieldDecorator('imgUrl', {
            rules: [{ required: true, message: '请上传图片' }],
            initialValue: current.imgUrl,
            getValueFromEvent: this.normFile,
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
                <img src={this.state.imageUrl ? imageUrl : `${filePath}${imageUrl}`} alt="avatar" />
              ) : (
                <div>
                  <Icon type={loading ? 'loading' : 'plus'} />
                  <div className={styles['ant-upload-text']}>点击上传</div>
                </div>
              )}
            </Upload>
          )}
        </FormItem> */}
        <FormItem {...formItemLayout} label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容' }],
            initialValue: current.content,
          })(<RichEditor placeholder="请输入内容" />)}
        </FormItem>
      </div>
    );
  }
}

export default ModalContent;

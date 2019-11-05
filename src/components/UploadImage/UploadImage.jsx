import { message, Icon, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import { ROOT_PATH } from '@/utils/request';
import styles from './index.less';

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
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('图片大小必须小于5MB!');
  }
  return isAllowed && isLt2M;
}

const UploadImage = ({ value, onChange }) => {
  const [imgUrl, setImgUrl] = useState(value);
  const [uploading, setUploading] = useState(false);

  useEffect(
    () => {
      setImgUrl(value);
    },
    [value]
  );
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imgUrl => {
        setImgUrl(imgUrl);
        setUploading(false);
      });
    }
    if (onChange) {
      onChange(info.file.response.data);
    }
  };

  return (
    <Upload
      name="file"
      action={`${ROOT_PATH}/api/files`}
      listType="picture-card"
      className={styles['avatar-uploader']}
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      headers={{
        Authorization: `Bearer ${accessToken}`,
      }}
    >
      {imgUrl ? (
        <img src={imgUrl} alt="avatar" />
      ) : (
        <div>
          <Icon type={uploading ? 'loading' : 'plus'} />
          <div>点击上传</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadImage;

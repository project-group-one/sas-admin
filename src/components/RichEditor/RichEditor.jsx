import { Modal, message } from 'antd';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import UploadImage from '../UploadImage';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';

const RichEditor = ({ onChange, value }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(value);
  const reactQuillRef = useRef();
  const urlRef = useRef();
  const handleChange = content => {
    setContent(content);
    if (onChange) onChange(content);
  };

  useEffect(
    () => {
      setContent(value);
    },
    [value]
  );
  const onImageClick = useCallback(() => {
    setVisible(true);
  }, []);
  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: onImageClick,
      },
    },
  };
  const imageHandler = () => {
    const url = urlRef.current;
    if (!url) return message.warn('请上传图片');
    const quill = reactQuillRef.current.getEditor(); // 获取到编辑器本身
    const cursorPosition = quill.getSelection().index; // 获取当前光标位置
    quill.insertEmbed(cursorPosition, 'image', url, Quill.sources.USER); // 插入图片
    quill.setSelection(cursorPosition + 1); // 光标位置加1
  };

  return (
    <>
      <ReactQuill ref={reactQuillRef} value={content} onChange={onChange} modules={modules} />
      <Modal
        onCancel={() => setVisible(false)}
        onOk={imageHandler}
        title={'图片上传'}
        visible={visible}
      >
        <div className={styles.uploadImg}>
          <UploadImage onChange={url => (urlRef.current = url)} />
        </div>
      </Modal>
    </>
  );
};

export default RichEditor;

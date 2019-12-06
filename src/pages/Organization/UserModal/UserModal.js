import React, { useState, useEffect } from 'react';
import { Modal, Transfer } from 'antd';
import { useSelector, useDispatch } from 'dva';

const UserModal = ({}) => {
  const dispatch = useDispatch();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const { dataSource, current } = useSelector(state => {
    const currentTarget = state.organization.current;
    return {
      dataSource: state.organization.noOrgUsers.concat(currentTarget.users || []).map(item => ({
        key: item.id,
        title: item.name,
      })),
      current: currentTarget,
    };
  });
  const visible = useSelector(state => state.organization.userModalVisible);
  const noOrgUsers = useSelector(state => state.organization.noOrgUsers);

  useEffect(
    () => {
      if (visible) {
        dispatch({
          type: 'organization/getNoOrgUsers',
        });
        dispatch({
          type: 'organization/fetchItem',
        });
      }
      return () => {};
    },
    [visible]
  );

  useEffect(
    () => {
      setTargetKeys(noOrgUsers.map(item => item.id));
      return () => {};
    },
    [noOrgUsers]
  );

  const handleCancel = () => {
    dispatch({
      type: 'organization/set',
      payload: {
        userModalVisible: false,
        current: {},
      },
    });
  };

  const handleChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <Modal
      visible={visible}
      title="分配用户"
      onOk={() => {
        dispatch({
          type: 'organization/addUsers',
          payload: {
            orgId: current.id,
            userIds: dataSource
              .filter(item => !targetKeys.includes(item.key))
              .map(item => item.key),
          },
        });
      }}
      onCancel={handleCancel}
    >
      <Transfer
        style={{ marginLeft: 34 }}
        dataSource={dataSource}
        titles={['组织', '用户']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => item.title}
      />
    </Modal>
  );
};

export default UserModal;

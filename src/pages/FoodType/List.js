import React, { PureComponent, Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Card, Icon, Button, Modal, Tree, Tooltip } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DetailModal from './DetailModal';

import styles from './List.less';
import { ROOT_PATH } from '@/utils/request';
import { useDispatch, useSelector } from 'react-redux';

const { TreeNode } = Tree;
const CardGrid = Card.Grid;

const List = ({}) => {
  const [currentNode, setCurrentNode] = useState();
  const data = useSelector(state => state.foodType.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'foodType/fetch',
    });
    return () => {};
  }, []);
  return (
    <PageHeaderWrapper title="食品类型">
      <Card bordered={false}>
        <CardGrid hoverable={false} style={{ width: '25%', minHeight: 500 }}>
          <div className={styles.actions}>
            <Tooltip title={!currentNode && '请先选择一个食品类别'}>
              <Icon
                onClick={e => {
                  if (!currentNode) return e.stopPropagation();
                  dispatch({
                    type: 'foodType/setState',
                    payload: { detailModalVisible: true, currentNode, isEdit: true },
                  });
                }}
                className={!currentNode && styles.disabled}
                type="edit"
                key="edit"
              />
            </Tooltip>
            <Tooltip title={!currentNode && '请先选择一个食品类别'}>
              <Icon
                className={!currentNode && styles.disabled}
                type={'plus'}
                onClick={e => {
                  if (!currentNode) return e.stopPropagation();
                  dispatch({
                    type: 'foodType/setState',
                    payload: { detailModalVisible: true, currentNode, isEdit: false },
                  });
                }}
              />
            </Tooltip>
          </div>
          <Tree
            onSelect={(selectedKeys, e) => {
              setCurrentNode(
                selectedKeys.length > 0
                  ? {
                      title: e.node.props.title,
                      key: e.node.props.eventKey,
                    }
                  : undefined
              );
            }}
            showLine
            treeData={data}
          />
        </CardGrid>
        <CardGrid hoverable={false} style={{ width: '75%', minHeight: 500 }}>
          aa
        </CardGrid>
      </Card>
      <DetailModal />
    </PageHeaderWrapper>
  );
};

export default List;

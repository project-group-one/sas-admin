import { Card, Icon, Tree, Tooltip, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DetailModal from './DetailModal';
import Detail from './Detail';

import styles from './List.less';

const CardGrid = Card.Grid;

const List = () => {
  const data = useSelector(state => state.foodType.data);
  const currentNode = useSelector(state => state.foodType.currentNode);
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
                  if (!currentNode) {
                    e.stopPropagation();
                    return;
                  }
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
                type="plus"
                onClick={e => {
                  if (!currentNode) {
                    e.stopPropagation();
                    return;
                  }
                  dispatch({
                    type: 'foodType/setState',
                    payload: { detailModalVisible: true, isEdit: false },
                  });
                }}
              />
            </Tooltip>
          </div>
          <Tree
            onSelect={(selectedKeys, e) => {
              dispatch({
                type: 'foodType/setState',
                payload: {
                  currentNode:
                    selectedKeys.length > 0
                      ? {
                          title: e.node.props.title,
                          key: e.node.props.eventKey,
                        }
                      : undefined,
                },
              });
              dispatch({
                type: 'foodType/getRegulation',
                payload: e.node.props.eventKey,
              });
            }}
            showLine
            defaultExpandedKeys={['-1']}
            treeData={data}
          />
        </CardGrid>
        <CardGrid hoverable={false} style={{ width: '75%', minHeight: 500 }}>
          {currentNode ? (
            <Detail />
          ) : (
            <Empty style={{ marginTop: 100 }} description="请选择一个食品类型" />
          )}
        </CardGrid>
      </Card>
      <DetailModal />
    </PageHeaderWrapper>
  );
};

export default List;

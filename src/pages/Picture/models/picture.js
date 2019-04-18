import { message } from 'antd';
import { queryPicture, updatePicture, addPicture, fetchPicture, removePicture, checkPicture } from '@/services/picture';

export default {
  namespace: 'picture',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    current: {},
    detailModalVisible: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const pagination = { current: 1, pageSize: 20 };
      const result = yield call(queryPicture, { ...pagination, ...payload });
      yield put({
        type: 'set',
        payload: {
          data: {
            list: result.data,
            pagination: result.pagination
          }
        },
      });
    },
    *fetchItem({ payload }, { call, put }) {
      const result = yield call(fetchPicture, payload);
      yield put({
        type: 'set',
        payload: { current: result },
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updatePicture, payload);
      yield put({
        type: 'fetch'
      })
      message.success('修改成功', 2);
    },
    *add({ payload }, { call, put }) {
      yield call(addPicture, payload);
      yield put({
        type: 'fetch'
      })
      message.success('保存成功', 2);
    },
    *remove({ payload }, { call, put }) {
      yield call(removePicture, payload);
      yield put({
        type: 'fetch'
      })
      message.success('删除成功', 2);
    },
  },

  reducers: {
    toggleDetailModalVisible(state, { payload }) {
      return {
        ...state,
        detailModalVisible: payload.visible,
        id: payload.id,
      }
    },
    clearCurrent(state) {
      return {
        ...state,
        id: undefined,
        current: {},
      }
    },
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};

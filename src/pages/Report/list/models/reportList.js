import { message } from 'antd';
import { queryReport, updateReport, addReport, fetchReport, removeReport, checkReport } from '@/services/report';

export default {
  namespace: 'reportList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    current: {},
    detailModalVisible: false,
    checkModalVisible: false,
    commentModalVisible: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const pagination = { current: 1, pageSize: 20 };
      const result = yield call(queryReport, { ...pagination, ...payload });
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
      const result = yield call(fetchReport, payload);
      yield put({
        type: 'set',
        payload: { current: result.data },
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateReport, payload);
      yield put({
        type: 'fetch'
      })
      message.success('修改成功', 2);
    },
    *add({ payload }, { call, put }) {
      yield call(addReport, payload);
      yield put({
        type: 'fetch'
      })
      message.success('保存成功', 2);
    },
    *remove({ payload }, { call, put }) {
      yield call(removeReport, payload);
      yield put({
        type: 'fetch'
      })
      message.success('删除成功', 2);
    },
    *check({ payload }, { call, put, select }) {
      const id = yield select(state => {
        return state.reportList.id;
      })
      const result = yield call(checkReport, id);
      yield put({
        type: 'fetch'
      })
      return result;
    },
    *comment({ payload }, { call, put }) {
      yield call(updateReport, payload);
      yield put({
        type: 'fetch'
      })
      message.success('评论成功', 2);
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
    toggleCheckModalVisible(state, { payload }) {
      return {
        ...state,
        checkModalVisible: payload.visible,
        id: payload.id,
      }
    },
    toggleCommentModalVisible(state, { payload }) {
      return {
        ...state,
        commentModalVisible: payload.visible,
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

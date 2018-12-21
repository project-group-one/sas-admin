import { queryReport } from '@/services/report';

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
      const data = yield call(queryReport, payload);
      yield put({
        type: 'update',
        payload: { data },
      });
    },
  },

  reducers: {
    toggleDetailModalVisible(state, { payload: visible }) {
      return {
        ...state,
        detailModalVisible: visible,
      }
    },
    toggleCheckModalVisible(state, { payload: visible }) {
      return {
        ...state,
        checkModalVisible: visible,
      }
    },
    toggleCommentModalVisible(state, { payload: visible }) {
      return {
        ...state,
        commentModalVisible: visible,
      }
    },
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};

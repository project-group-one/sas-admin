import { query, find, add, update } from '@/services/users';

export default {
  namespace: 'users',

  state: {
    list: [],
    queryParams: {
      current: 1,
      pageSize: 10
    },
    total: 0,
    user: {},
    editModalVisible: false,
  },

  effects: {
    *getUserList({ payload }, { call, put, select }) {
      let params = yield select(state => state.users.queryParams);
      params = { ...params, ...payload };
      const result = yield call(query, params);
      yield put({
        type: 'set',
        payload: {
          list: result.data,
          total: result.pagination.total,
          queryParams: { ...payload },
        },
      });
    },
    *getUser({ payload }, { call, put }) {
      const result = yield call(find, payload);
      if (result.data) {
        yield put({
          type: 'setUser',
          payload: result.data,
        });
      }
    },
    *updateUser({ payload }, { call, put }) {
      let func = payload.id ? update : add;
      const result = yield call(func, payload);
    },
  },

  reducers: {
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setListConditions(state, { payload }) {
      const listConditions = { ...state.listConditions, ...payload };
      return {
        ...state,
        listConditions,
      };
    },
    setEditModalVisible(state, { payload }) {
      return {
        ...state,
        editModalVisible: payload,
      };
    },
    setUser(state, { payload }) {
      return {
        ...state,
        user: payload,
      };
    },
  },
};

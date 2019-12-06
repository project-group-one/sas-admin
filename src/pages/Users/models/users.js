import { message } from 'antd';
import { query, find, add, update, freezeUser, thawUser } from '@/services/users';
import { userAudit, getUserAuditDetail } from '@/services/admin';


export default {
  namespace: 'users',

  state: {
    list: [],
    queryParams: {
      current: 1,
      pageSize: 10,
    },
    total: 0,
    user: {},
    userAuditDetail: {},
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
          total: result.pagination ? result.pagination.total : result.data.length,
          queryParams: { ...payload },
        },
      });
    },
    *getUser({ payload }, { call, put }) {
      const result = yield call(find, payload);
      if (result) {
        yield put({
          type: 'setUser',
          payload: result.data || [],
        });
      }
    },
    *updateUser({ payload }, { call, select, put }) {
      const currentUserId = yield select(state => state.global.currentUser.id);
      if (payload.id) {
        yield call(update, payload, currentUserId);
      } else {
        yield call(add, payload, currentUserId);
      }
      yield put({
        type: 'set',
        payload: {
          editModalVisible: false,
        },
      });
      message.success('保存成功');
    },
    *toggleUserStatus(
      {
        payload: { targetUserId, enabled },
      },
      { call, put, select }
    ) {
      const currentUserId = yield select(state => state.global.currentUser.id);
      if (enabled) {
        yield call(thawUser, targetUserId);
      } else {
        yield call(freezeUser, {
          targetUserId,
          currentUserId,
        });
      }

      yield put({
        type: 'getUserList',
      });
    },
    *userAudit({ payload }, { call, put }) {
      yield call(userAudit, payload);
      yield put({
        type: 'setEditModalVisible',
        payload: false,
      });
      yield put({
        type: 'getUserList',
      });
    },
    *getUserAuditDetail({ payload }, { call, put }) {
      const result = yield call(getUserAuditDetail, payload);
      yield put({
        type: 'set',
        payload: {
          userAuditDetail: result.data || {},
        },
      });
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

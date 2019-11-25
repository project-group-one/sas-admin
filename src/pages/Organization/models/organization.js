import { message } from 'antd';
import {
  queryOrganization,
  updateOrganization,
  addOrganization,
  fetchOrganization,
  removeOrganization,
  addUsers,
  auditOrganization,
} from '@/services/organization';
import { getNoOrgUsers } from '@/services/users';

export default {
  namespace: 'organization',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    current: {},
    detailModalVisible: false,
    auditModalVisible: false,
    userModalVisible: false,
    noOrgUsers: [],
    id: undefined,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const pagination = { current: 1, pageSize: 20 };
      const result = yield call(queryOrganization, { ...pagination, ...payload });
      // const result = {
      //   data: [{ id: 1, name: '123123' }],
      //   pagination: {},
      // };
      yield put({
        type: 'set',
        payload: {
          data: {
            list: result ? result.data : [],
            pagination: result ? result.pagination : {},
          },
        },
      });
    },
    *fetchItem({ payload }, { call, put, select }) {
      const id = yield select(state => state.organization.current.id);
      const result = yield call(fetchOrganization, id);
      yield put({
        type: 'set',
        payload: { current: result || {} },
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateOrganization, payload);
      yield put({
        type: 'fetch',
      });
      message.success('修改成功', 2);
    },
    *add({ payload }, { call, put }) {
      yield call(addOrganization, payload);
      yield put({
        type: 'fetch',
      });
      message.success('保存成功', 2);
    },
    *remove({ payload }, { call, put }) {
      yield call(removeOrganization, payload);
      yield put({
        type: 'fetch',
      });
      message.success('删除成功', 2);
    },
    *getNoOrgUsers({ payload }, { call, put }) {
      const users = yield call(getNoOrgUsers);
      yield put({
        type: 'set',
        payload: { noOrgUsers: users.data || [] },
      });
    },
    *addUsers({ payload }, { call, put }) {
      yield call(addUsers, payload);
      message.success('添加用户成功', 2);
    },
    *auditOrganization({ payload }, { call, select }) {
      const id = yield select(state => state.organization.current.id);
      yield call(auditOrganization, id, payload);
      message.success('审核成功', 2);
    },
  },

  reducers: {
    toggleDetailModalVisible(state, { payload }) {
      return {
        ...state,
        detailModalVisible: payload.visible,
        id: payload.id,
      };
    },
    clearCurrent(state) {
      return {
        ...state,
        id: undefined,
        current: {},
      };
    },
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

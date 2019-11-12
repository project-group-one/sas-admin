import { message } from 'antd';
import { queryFoodType, updateFoodType, addFoodType } from '@/services/foodType';

export default {
  namespace: 'foodType',

  state: {
    data: [],
    currentNode: undefined,
    detailModalVisible: false,
    isEdit: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(queryFoodType, {});
      yield put({
        type: 'setState',
        payload: {
          data: {
            key: 0,
            title: '食品',
            children: result,
          },
        },
      });
    },
    *fetchItem({ payload }, { call, put }) {
      const result = yield call(fetchFoodType, payload);
      yield put({
        type: 'set',
        payload: { current: result.data },
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateFoodType, payload);
      yield put({
        type: 'fetch',
      });
      message.success('修改成功', 2);
    },
    *add({ payload }, { call, put }) {
      yield call(addFoodType, payload);
      yield put({
        type: 'fetch',
      });
      message.success('保存成功', 2);
    },
    *remove({ payload }, { call, put }) {
      yield call(removeFoodType, payload);
      yield put({
        type: 'fetch',
      });
      message.success('删除成功', 2);
    },
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
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

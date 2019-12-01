import { message } from 'antd';
import { queryFoodType, updateFoodType, addFoodType } from '@/services/foodType';
import { getRegulation, updateRegulation } from '@/services/regulation';

export default {
  namespace: 'foodType',

  state: {
    data: [],
    /**
     * {
     *  title: string,
     *  key: string | number
     * }
     */
    currentNode: undefined,
    detailModalVisible: false,
    isEdit: false,
    regulation: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(queryFoodType, {});
      yield put({
        type: 'setState',
        payload: {
          data: [
            {
              key: -1,
              title: '食品',
              children: result.data,
            },
          ],
        },
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateFoodType, payload);
      yield put({
        type: 'fetch',
      });
      message.success('修改成功', 2);
    },
    *updateRegulation({ payload }, { call, put }) {
      yield call(updateRegulation, payload);
      yield put({
        type: 'getRegulation',
        payload: payload.typeId,
      });
      message.success('更新成功', 2);
    },
    *add({ payload }, { call, put }) {
      yield call(addFoodType, payload);
      yield put({
        type: 'fetch',
      });
      message.success('保存成功', 2);
    },
    *getRegulation({ payload }, { call, put }) {
      const result = yield call(getRegulation, payload);
      yield put({
        type: 'set',
        payload: {
          regulation: result.data || {},
        },
      });
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

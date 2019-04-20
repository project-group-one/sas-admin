import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { login } from '@/services/login';
import { queryCurrent } from '@/services/user';
import { push } from 'react-router-redux';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import parseJwt from '@/utils/parseJwt';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('expired', response.expired);
      yield put({
        type: 'global/fetchCurrentUser',
      });
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: {
      //     status: true,
      //     currentAuthority: 'guest',
      //   },
      // });
      yield put(push('/report'));
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      localStorage.clear();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

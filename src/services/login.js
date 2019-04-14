import { stringify } from 'qs';
import request from '@/utils/request';

export async function login(params) {
  return request(`/login?${stringify(params)}`, {
    method: 'post',
    headers: params,
  });
}

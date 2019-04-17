import { stringify } from 'qs';
import request from '@/utils/request';

export async function login(params) {
  return request(`/auth/token`, {
    method: 'POST',
    body: params,
    noToken: true,
  });
}

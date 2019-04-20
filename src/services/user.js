import request from '@/utils/request';

export async function query() {
  return request('/api/user');
}

export async function fetchItem(id) {
  return request(`/api/user/${id}`);
}

export async function queryCurrent() {
  return request('/api/user/current');
}

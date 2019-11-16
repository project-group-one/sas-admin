import { stringify } from 'qs';
import request from '@/utils/request';

export function query(params) {
  return request(`/api/user?${stringify(params)}`);
}

export function find(id) {
  return request(`/api/user/${id}`);
}

export function remove(id) {
  return request(`/api/user/${id}`, {
    method: 'DELETE',
  });
}

export function add(params) {
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export function update(user) {
  return request(`/api/user/${user.id}`, {
    method: 'PUT',
    body: user,
  });
}

export function getNoOrgUsers() {
  return request(`/api/user/not-org`, {
    method: 'GET',
  });
}

// export function check(id) {
//     return request(`/api/users/${id}/detection`, {
//         method: 'PATCH',
//     })
// }

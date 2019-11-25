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

export function add(params, currentUserId) {
  return request(
    `/api/user?${stringify({
      id: currentUserId,
    })}`,
    {
      method: 'POST',
      body: params,
    }
  );
}

export function update(user, currentUserId) {
  return request(
    `/api/user/${user.id}?${stringify({
      id: currentUserId,
    })}`,
    {
      method: 'PUT',
      body: user,
    }
  );
}

export function getNoOrgUsers() {
  return request(`/api/user/not-org`, {
    method: 'GET',
  });
}

export function freezeUser({ targetUserId, currentUserId }) {
  return request(
    `/api/user/${targetUserId}/freeze?${stringify({
      id: currentUserId,
    })}`,
    {
      method: 'POST',
    }
  );
}

// 解冻用户
export function thawUser(targetUserId) {
  return request(`/api/user/${targetUserId}/thaw`, {
    method: 'POST',
  });
}

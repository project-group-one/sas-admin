import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryPicture(params) {
  return request(`/api/pic?${stringify(params)}`);
}

export async function fetchPicture(id) {
  return request(`/api/pic/${id}`);
}

export async function removePicture(id) {
  return request(`/api/pic/${id}`, {
    method: 'DELETE',
  });
}

export async function addPicture(params) {
  return request('/api/pic', {
    method: 'POST',
    body: params,
  });
}

export async function updatePicture(current) {
  return request(`/api/pic/${current.id}`, {
    method: 'PUT',
    body: current,
  });
}

export async function checkPicture(id) {
  return request(`/api/pic/${id}/detection`, {
    method: 'PATCH',
  });
}

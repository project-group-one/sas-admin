import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryRegulation(params) {
  return request(`/api/regulation?${stringify(params)}`);
}

export async function fetchRegulation(id) {
  return request(`/api/regulation/${id}`);
}

export async function removeRegulation(id) {
  return request(`/api/regulation/${id}`, {
    method: 'DELETE',
  });
}

export async function addRegulation(params) {
  return request('/api/regulation', {
    method: 'POST',
    body: params,
  });
}

export async function updateRegulation(current) {
  return request(`/api/regulation/${current.id}`, {
    method: 'PUT',
    body: current,
  });
}

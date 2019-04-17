import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryOrganization(params) {
  return request(`/api/organization?${stringify(params)}`);
}

export async function fetchOrganization(id) {
  return request(`/api/organization/${id}`);
}

export async function removeOrganization(id) {
  return request(`/api/organization/${id}`, {
    method: 'DELETE',
  });
}

export async function addOrganization(params) {
  return request('/api/organization', {
    method: 'POST',
    body: params,
  });
}

export async function updateOrganization(current) {
  return request(`/api/organization/${current.id}`, {
    method: 'PUT',
    body: current,
  });
}

export async function checkOrganization(id) {
  return request(`/api/organization/${id}/detection`, {
    method: 'PATCH',
  });
}

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

// status: WAIT_AUDIT | AUDITING | FAIL | SUCCESS
export async function auditOrganization(id, body) {
  return request(`/api/organization/${id}/audit?${stringify(body)}`, {
    method: 'PUT',
  });
}

/**
 *
 * @param {{
 *   "orgId": 0,
 *   "userIds": [
 *   0
 *   ]
 * }} body
 */
export async function addUsers(body) {
  return request(`/api/organization/users`, {
    method: 'POST',
    body,
  });
}

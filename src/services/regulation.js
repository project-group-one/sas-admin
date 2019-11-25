import { stringify } from 'qs';
import request from '@/utils/request';

export async function updateRegulation(body) {
  return request(`/api/food/regulation`, {
    method: 'POST',
    body,
  });
}

export async function getRegulation(id) {
  return request(`/api/food/regulation/${id}`, {
    method: 'GET',
  });
}

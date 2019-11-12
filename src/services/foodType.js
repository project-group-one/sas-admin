import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryFoodType(params) {
  return request(`/api/food-types?${stringify(params)}`);
}

export async function fetchFoodType(id) {
  return request(`/api/food-types/${id}`);
}

export async function removeFoodType(id) {
  return request(`/api/food-types/${id}`, {
    method: 'DELETE',
  });
}

export async function addFoodType(params) {
  return request('/api/food-types', {
    method: 'POST',
    body: params,
  });
}

export async function updateFoodType(current) {
  return request(`/api/food-types/${current.id}`, {
    method: 'PUT',
    body: current,
  });
}

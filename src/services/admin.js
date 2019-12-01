import { stringify } from 'qs';
import request from '@/utils/request';

// 用户审核
export async function userAudit(id) {
  return request(`/admin/user/verfy/${id}`, {
    method: 'PUT',
  });
}

// 用户审核详情
export async function getUserAuditDetail(userId) {
  return request(`/admin/user/verification/${userId}`, {
    method: 'GET',
  });
}

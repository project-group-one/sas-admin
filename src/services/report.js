import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryReport(params) {
    return request(`/api/reports?${stringify(params)}`);
}

export async function removeReport(params) {
    return request('/api/reports', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addReport(params) {
    return request('/api/reports', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateReport(params) {
    return request('/api/reports', {
        method: 'POST',
        body: {
            ...params,
            method: 'update',
        },
    });
}
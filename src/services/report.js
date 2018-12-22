import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryReport(params) {
    return request(`/api/reports?${stringify(params)}`);
}

export async function fetchReport(id) {
    return request(`/api/reports/${id}`);
}

export async function removeReport(id) {
    return request(`/api/reports/${id}`, {
        method: 'DELETE',
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

export async function updateReport(current) {
    return request(`/api/reports/${current.id}`, {
        method: 'PUT',
        body: current,
    });
}

export async function checkReport(id) {
    return request(`/api/reports/${id}/detection`, {
        method: 'PATCH',
    })
}
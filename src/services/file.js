import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryFile(params) {
    return request(`/api/files?${stringify(params)}`);
}

export async function removeFile(params) {
    return request('/api/files', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addFile(params) {
    return request('/api/files', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateFile(params) {
    return request('/api/files', {
        method: 'POST',
        body: {
            ...params,
            method: 'update',
        },
    });
}
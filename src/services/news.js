import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryNews(params) {
    return request(`/api/news?${stringify(params)}`);
}

export async function fetchNews(id) {
    return request(`/api/news/${id}`);
}

export async function removeNews(id) {
    return request(`/api/news/${id}`, {
        method: 'DELETE',
    });
}

export async function addNews(params) {
    return request('/api/news', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateNews(current) {
    return request(`/api/news/${current.id}`, {
        method: 'PUT',
        body: current,
    });
}

export async function checkNews(id) {
    return request(`/api/news/${id}/detection`, {
        method: 'PATCH',
    })
}
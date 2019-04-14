import { stringify } from 'qs';
import request from '@/utils/request';

export function query(params) {
    return request(`/users?${stringify(params)}`);
}

export function find(id) {
    return request(`/api/users/${id}`);
}

export function remove(id) {
    return request(`/api/users/${id}`, {
        method: 'DELETE',
    });
}

export function add(params) {
    return request('/api/users', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export function update(user) {
    return request(`/api/users/${user.id}`, {
        method: 'PUT',
        body: user,
    });
}

// export function check(id) {
//     return request(`/api/users/${id}/detection`, {
//         method: 'PATCH',
//     })
// }

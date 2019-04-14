import moment from 'moment';
import users from './db';
import { pagingQuery, parseQuery } from '../utils';

export default {
    'GET /api/users': (req, res) => {
        const { query } = req;
        const { current, pageSize, startDate, endDate, type, sort = [], name } = parseQuery(query);
        const { list, pagination } = pagingQuery(
            users.list,
            { current, pageSize },
            {
                type, createdAt: (item, key) => {
                    const target = item[key];
                    if (startDate && endDate) {
                        return moment(startDate).valueOf() <= moment(target).valueOf() && moment(endDate).valueOf() >= moment(target).valueOf()
                    }
                    return true;
                }
            },
            { field: sort[0], order: sort[1] },
            { name },
        );
        res.json({
            data: list,
            pagination,
        })
    },

    'GET /api/users/:id': (req, res) => {
        res.json({
            data: users.list.find(item => item.id.toString() === req.params.id.toString())
        });
    },

    'PUT /api/users/:id': (req, res) => {
        const index = users.list.findIndex(item => item.id.toString() === req.params.id.toString())
        if (typeof index !== 'undefined') {
            users.list[index] = { ...users.list[index], ...req.body };
        }
        res.status('201').json()
    },

    'POST /api/users': (req, res) => {
        users.list.unshift({ ...req.body, id: Date.now().toString() });
        res.status('201').json();
    },

    'DELETE /api/users/:id': (req, res) => {
        const index = users.list.findIndex(item => item.id.toString() === req.params.id.toString());
        users.list.splice(index, 1);
        res.status('204').json();
    },
}

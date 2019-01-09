import moment from 'moment';
import news from './db';
import { pagingQuery, parseQuery } from '../utils';

export default {
    'GET /api/news': (req, res) => {
        const { query } = req;
        const { current, pageSize, startDate, endDate, type, sort = [], name } = parseQuery(query);
        const { list, pagination } = pagingQuery(
            news.list,
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

    'GET /api/news/:id': (req, res) => {
        res.json({
            data: news.list.find(item => item.id.toString() === req.params.id.toString())
        });
    },

    'PUT /api/news/:id': (req, res) => {
        const index = news.list.findIndex(item => item.id.toString() === req.params.id.toString())
        if (typeof index !== 'undefined') {
            news.list[index] = { ...news.list[index], ...req.body };
        }
        res.status('201').json()
    },

    'POST /api/news': (req, res) => {
        news.list.unshift({ ...req.body, id: Date.now().toString() });
        res.status('201').json();
    },

    'DELETE /api/news/:id': (req, res) => {
        const index = news.list.findIndex(item => item.id.toString() === req.params.id.toString());
        news.list.splice(index, 1);
        res.status('204').json();
    },
}

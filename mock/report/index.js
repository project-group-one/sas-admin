import moment from 'moment';
import report from './db';
import { pagingQuery, parseQuery } from '../utils';

export default {
    'GET /api/reports': (req, res) => {
        const { query } = req;
        const { current, pageSize, startDate, endDate, type, sort = [], name } = parseQuery(query);
        const { list, pagination } = pagingQuery(
            report.list,
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
            list,
            pagination,
        })
    },

    'GET /api/reports/:id': (req, res) => {
        res.json(report.list.find(item => item.id.toString() === req.params.id.toString()));
    },

    'PUT /api/reports/:id': (req, res) => {
        const index = report.list.findIndex(item => item.id.toString() === req.params.id.toString())
        if (typeof index !== 'undefined') {
            report.list[index] = { ...report.list[index], ...req.body };
        }
        res.status('201').json()
    },

    'POST /api/reports': (req, res) => {
        report.list.unshift({ ...req.body, id: Date.now().toString() });
        res.status('201').json();
    },

    'DELETE /api/reports/:id': (req, res) => {
        const index = report.list.findIndex(item => item.id.toString() === req.params.id.toString());
        report.list.splice(index, 1);
        res.status('204').json();
    },
}

import moment from 'moment';
import file from './db';
import { pagingQuery, parseQuery } from '../utils';

export default {
    'GET /api/files': (req, res) => {
        const { query } = req;
        const { current, pageSize, startDate, endDate, type, sort = [], name } = parseQuery(query);
        const { list, pagination } = pagingQuery(
            file.list,
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

    'GET /api/files/:id': (req, res) => {
        res.json(file.list.find(item => item.id.toString() === req.params.id.toString()));
    },

    'PUT /api/files/:id': (req, res) => {
        const index = file.list.findIndex(item => item.id.toString() === req.params.id.toString())
        if (typeof index !== 'undefined') {
            file.list[index] = { ...file.list[index], ...req.body };
        }
        res.status('201').json()
    },

    'POST /api/files': (req, res) => {
        file.list.unshift({ ...req.body, id: Date.now().toString() });
        res.json({
            path: 'http://a.hiphotos.baidu.com/image/pic/item/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg'
        });
    },

    'DELETE /api/files/:id': (req, res) => {
        const index = file.list.findIndex(item => item.id.toString() === req.params.id.toString());
        file.list.splice(index, 1);
        res.status('204').json();
    },

    'POST /api/files/upload': (req, res) => {
        res.json({
            path: 'http://a.hiphotos.baidu.com/image/pic/item/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg',
        });
    },
}

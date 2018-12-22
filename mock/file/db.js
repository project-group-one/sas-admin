import moment from 'moment';
import { getRangeNumber } from '../utils';

const getList = () => new Array(200).fill('file').map((item, index) => ({
    id: index.toString(),
    path: 'http://a.hiphotos.baidu.com/image/pic/item/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg',
    createdAt: moment(`201${getRangeNumber(0, 8)}-${getRangeNumber(1, 8)}-${getRangeNumber(1, 30)}`).format('YYYY-MM-DD'),
}))

export default {
    list: getList(),
}
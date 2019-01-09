import moment from 'moment';
import { getRangeNumber } from '../utils';

const types = ['type0', 'type1', 'type2', 'type3'];

const getList = () => new Array(200).fill('news').map((item, index) => ({
    id: index.toString(),
    name: `名称${item}${index}`,
    url: 'http://a.hiphotos.baidu.com/image/pic/item/b999a9014c086e062550d0020f087bf40bd1cbfb.jpg',
    age: getRangeNumber(10, 100),
    createdDate: moment(`201${getRangeNumber(0, 8)}-${getRangeNumber(1, 8)}-${getRangeNumber(1, 30)}`).format('YYYY-MM-DD'),
    type: types[index % 3],
}))

export default {
    list: getList(),
}
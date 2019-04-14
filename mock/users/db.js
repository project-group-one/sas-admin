import moment from 'moment';
import { getRangeNumber } from '../utils';

const types = [0, 1, 2, 3];
const statuses = [0, 1]

const getList = () => new Array(200).fill('user').map((item, index) => ({
    id: index.toString(),
    address: '杭州市',
    name: `名称${item}${index}`,
    age: getRangeNumber(10, 100),
    phone: getRangeNumber(10, 100),
    createdDate: moment(`201${getRangeNumber(0, 8)}-${getRangeNumber(1, 8)}-${getRangeNumber(1, 30)}`).format('YYYY-MM-DD'),
    type: types[index % 3],
    status: statuses[index % 2],
    username: '123232',
    password: '2312312'
}))

export default {
    list: getList(),
}
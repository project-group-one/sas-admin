/**
 * 将query中的第一级以逗号隔开的字符串转化为数组
 */
export default (query) => {
    return Object.keys(query).reduce(
        (target, key) => {
            const value = query[key];
            target[key] = value;
            if (typeof value === 'string') {
                const valueArr = value.split(',');
                if (valueArr.length > 1) {
                    target[key] = valueArr;
                }
            }
            return target;
        },
        {}
    )
}
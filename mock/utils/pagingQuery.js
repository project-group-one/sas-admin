/**
 * {array}  list        数据源
 * {object} pagination  分页信息 { current: number, pageSize: number }
 * {object} filters     筛选信息 { [name: string]: string | function }
 * {object} sorter      过滤信息 { field: string, order: 'desc' | 'asc' }
 * {object} keywords    模糊筛选信息 { [name: string]: string }
 */
export default (list = [], pagination = {}, filters = {}, sorter = {}, keywords) => {
    let newList = [...list];
    const { current = 1, pageSize = 20 } = pagination;

    // 筛选信息准确匹配
    newList = filterList(newList, filters);

    // 排序信息
    if (sorter.field && sorter.order) {
        const { order, field } = sorter;
        if (order.toLowerCase() === 'desc') {
            newList = newList.sort(
                (a, b) => b[field] - a[field]
            )
        } else if (order.toLowerCase() === 'asc') {
            newList = newList.sort(
                (a, b) => a[field] - b[field]
            )
        }
    }

    // 关键词模糊匹配
    newList = filterList(newList, keywords, (item, key, value) => item[key].indexOf(value) > -1);

    // 分页信息
    const start = (current - 1) * pageSize;
    const end = start + parseInt(pageSize, 10);
    return { list: newList.slice(start, end), pagination: { current, pageSize, total: newList.length } };
}


function filterList(list, filterInfo, ownFilter) {
    const filterKeys = Object.keys(filterInfo);
    if (filterKeys.length === 0) return list;
    return list.filter(
        (item, index) => filterKeys.every(
            filterKey => {
                const filterValue = filterInfo[filterKey];
                if (typeof filterValue === 'undefined') return true;
                if (typeof ownFilter === 'function') return ownFilter(item, filterKey, filterValue, index);
                if (typeof filterValue === 'function') return filterValue(item, filterKey, filterValue, index)
                return item[filterKey] === filterValue;
            }
        )
    )
}
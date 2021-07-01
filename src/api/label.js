import request from '@/utils/request'
export default {
  // 分页条件查询
  getList(queryInfo) {
    return request({
      url: `/article/label/search`,
      method: 'post',
      data: {
        ...queryInfo.query,
        current: queryInfo.current,
        size: queryInfo.size
      }
    })
  },
  // 正常状态下的分类
  getNormalList() {
    return request({
      url: `/article/category/list`,
      method: 'get'
    })
  },
  // 新增
  add(data) {
    return request({
      url: `/article/label`,
      method: 'post',
      data
    })
  },
  // id 查询
  getById(id) {
    return request({
      url: `/article/label/${id}`,
      method: 'get'
    })
  },
  // 编辑更新
  update(data) {
    return request({
      url: `/article/label`,
      method: 'put',
      data
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/article/label/${id}`,
      method: 'delete'
    })
  }
}

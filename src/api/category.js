import request from '@/utils/request'
export default {
  // 分页条件查询
  getList(queryInfo) {
    return request({
      url: `/article/category/search`,
      method: 'post',
      data: {
        ...queryInfo.query,
        current: queryInfo.current,
        size: queryInfo.size
      }
    })
  },
  // 新增接口
  add(data) {
    return request({
      url: `/article/category`,
      method: 'post',
      data: data
    })
  },

  // 编辑查询id
  getById(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'get'
    })
  },
  // 更新
  update(data) {
    return request({
      url: `/article/category`,
      method: 'put',
      data: data
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  }
}

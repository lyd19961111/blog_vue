import request from '@/utils/request'
export default {
  // 列表接口
  getList(query) {
    return request({
      url: '/system/menu/search',
      method: 'post',
      data: query
    })
  },
  // 新增接口
  add(data) {
    return request({
      url: '/system/menu',
      method: 'post',
      data
    })
  },
  // 查询
  getById(id) {
    return request({
      url: `/system/menu/${id}`,
      method: 'get'
    })
  },
  // 更新
  update(data) {
    return request({
      url: '/system/menu',
      method: 'put',
      data
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/system/menu/${id}`,
      method: 'delete'
    })
  }
}
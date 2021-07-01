import request from '@/utils/request'
export default {
  getlist(query, current, size) {
    return request({
      url: `/article/article/search`,
      method: 'post',
      data: {
        ...query,
        current,
        size
      }
    })
  },
  getById(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'get'
    })
  },
  getCategoryAndLabel() {
    return request({
      url: `/article/category/label/list`,
      method: 'get'
    })
  },
  // 审核通过接口
  auditSuccess(id) {
    return request({
      url: `/article/article/audit/success/${id}`,
      method: 'get'
    })
  },
  // 审核不通过接口
  auditFail(id) {
    return request({
      url: `/article/article/audit/fail/${id}`,
      method: 'get'
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'delete'
    })
  }
}

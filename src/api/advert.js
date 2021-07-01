import request from '@/utils/request'
export default {
  // 列表分页接口
  getList(query, current, size) {
    return request({
      url: `/article/advert/search`,
      method: 'post',
      data: { ...query, current, size }
    })
  }
}

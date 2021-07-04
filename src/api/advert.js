import request from '@/utils/request'
export default {
  // 列表分页接口
  getList(query, current, size) {
    return request({
      url: `/article/advert/search`,
      method: 'post',
      data: { ...query, current, size }
    })
  },
  // 上传图片接口
  uploadImg(data = {}) {
    return request({
      url: `/article/file/upload`,
      method: 'post',
      data
    })
  },
  // 删除图片
  deleteImg(imageUrl) {
    return request({
      url: `/article/file/delete`,
      method: 'delete',
      params: {
        'fileUrl': imageUrl
      }
    })
  },
  // 新增广告
  add(data) {
    return request({
      url: `/article/advert`,
      method: 'post',
      data
    })
  },
  // 查询
  getById(id) {
    return request({
      url: `/article/advert/${id}`,
      method: 'get'
    })
  },
  // 更新
  update(data) {
    return request({
      url: `/article/advert`,
      method: 'put',
      data
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/article/advert/${id}`,
      method: 'delete'
    })
  }
}

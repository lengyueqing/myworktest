// 引入request
import request from '@/utils/request'
// 公共的根路径地址
const api_name = '/admin/product/baseTrademark'
export default {
  // 根据关键字搜索品牌信息列表数据
  getTrademarkKeyword(keyword) {
    return request({
      url: `${api_name}/findBaseTrademarkByKeyword/${keyword}`,
      method: 'GET'
    })
  },
  // 根据ID搜索品牌信息列表数据
  getTrademarkId(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'GET'
    })
  },
  /* // 获取品牌信息，无须参数
  getTrademarkList () {

  }, */
  // 获取品牌信息，分页方式
  getTrademarkList(page, limit) {
    if (page && limit) {
      return request.get(`${api_name}/${page}/${limit}`)
    }
    return request.get(`${api_name}/getTrademarkList`)
  },
  /*  // 新增品牌
   addTrademark (trademark) {
   }, */
  // 修改品牌或者新增品牌
  addorUpdateTrademark(trademark) {
    if (trademark.id) {
      return request({
        url: `${api_name}/update`,
        method: 'PUT',
        data: trademark
      })
    }
    return request({
      url: `${api_name}/save`,
      method: 'POST',
      data: trademark
    })
  },
  // 删除品牌
  deleteTrademark(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }
}

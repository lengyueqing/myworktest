// 引入request
import request from "@/utils/request";
// 公共的根路径地址
const api_name = "/admin/product";

export default {
  getBaseSaleAttrList() {
    //获取所以的销售属性接口
    return request({
      url: `${api_name}/baseSaleAttrList`,
      method: "GET"
    });
  },
  //删除spu
  deleteSpu(spuId) {
    return request({
      url: `${api_name}/deleteSpu/${spuId}`,
      method: "DELETE"
    });
  },
  //根据关键字查找对应的spuInfo对象的数据
  findSpuInfoByKeywor(keyword) {
    return request({
      url: `${api_name}/findSpuInfoByKeyword/${keyword}`,
      method: "GET"
    });
  },
  //根据spuId获得spuInfo对象数据
  getSpuById(spuId) {
    return request({
      url: `${api_name}/getSpuById/${spuId}`,
      method: "GET"
    });
  },
  //根据spuId的数组获取对应的spuInfo的数据
  findSpuInfoBySpuIdList(spuIdList) {
    return request({
      url: `${api_name}/inner/findSpuInfoBySpuIdList`,
      method: "POST",
      spuIdList
    });
  },
  //添加或者修改spu
  saveSpuInfo(spuInfo) {
    if (spuInfo.id) {
      return request({
        url: `${api_name}/product/updateSpuInfo`,
        method: "POST",
        spuInfo
      });
    }
    return request({
      url: `${api_name}/product/saveSpuInfo`,
      method: "POST",
      spuInfo
    });
  },

  //分页的方式获得spuInfo列表数据
  getSpuInfoList(page, limit, catgoryId) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: "GET",
      params: catgoryId 
    });
  }
};

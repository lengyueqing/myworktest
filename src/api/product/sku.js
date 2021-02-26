// 引入request
import request from "@/utils/request";
// 公共的根路径地址
const api_name = "/admin/product";

export default {
  //下架
  cancelSale(skuId) {
    return request({
      url: `${api_name}/cancelSale/${skuId}`,
      method: "GET"
    });
  },
  //上架
  onSale(skuId) {
    return request({
      url: `${api_name}/onSale/${skuId}`,
      method: "GET"
    });
  },
  //根据id删除sku
  deleteSku(skuId) {
    return request({
      url: `${api_name}/deleteSku/${skuId}`,
      method: "DELETE"
    });
  },
  //根据spuId查找对应的skuInfo的对象数组数据
  findBySpuId(spuId) {
    return request({
      url: `${api_name}/findBySpuId/${spuId}`,
      method: "GET"
    });
  },
  //根据sku的id获得skuinfo对象数据
  getById(skuId) {
    return request({
      url: `${api_name}/getSkuById/${skuId}`,
      method: "GET"
    });
  },
  //根据关键字查找对应的sku信息
  findSkuInfoByKeyword(keyword) {
    return request({
      url: `${api_name}/inner/findSkuInfoByKeyword/${keyword}`,
      method: "GET"
    });
  },
  //根据skuid数组查找对应的sku数据
  findSkuInfoBySkuIdList(skuIdList) {
    return request({
      url: `${api_name}/inner/findSkuInfoBySkuIdList`,
      method: "POST",
      skuIdList
    });
  },
  //分页的方式获取sku列表数据
  findSkuInfoBySkuIdList(pag, limit) {
    return request({
      url: `${api_name}/list/${page}/${limit}`,
      method: "GET"
    });
  },
  //添加或者修改sku的数据
  addOrUadateSkuInfo(skuInfo) {
    if (skuInfo.id) {
      return request({
        url: `${api_name}/product/updateSkuInfo`,
        method: "POST",
        skuInfo
      });
    }
    return request({
      url: `${api_name}/inner/saveSkuInfo`,
      method: "POST",
      skuInfo
    });
  },
  //根据spuId获取对应的spu中的图片数组
  getSpuImageList(spuId) {
    return request({
      url: `${api_name}/spuImageList/${spuId}`,
      method: "GET"
    });
  },
  //根据spuId获取对应的spu中的销售属性
  getSpuSaleAttrList(spuId) {
    return request({
      url: `${api_name}/spuSaleAttrList/${spuId}`,
      method: "GET"
    });
  }
};

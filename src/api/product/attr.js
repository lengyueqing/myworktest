// 引入request
import request from "@/utils/request";
// 公共的根路径地址
const api_name = "/admin/product";
export default {
  //根据三级分类ID获取对应平台属性信息数据
  getAttrList(category1Id, category2Id, geCategory3Id) {
    return request({
      url: `${api_name}/attrInfoList/${category1Id}/${category2Id}/${geCategory3Id}`,
      method: "GET"
    });
  },
  //根据平台属性的ID删除对应的平台属性值
  deleteAttrById(attrId) {
    return request({
      url: `${api_name}/deleteAttr/${attrId}`,
      method: "delete"
    });
  },
  //添加或者修改平台属性值
  addOrUpdate(attrInfo) {
    return request.post(`${api_name}/saveAttrInfo`, attrInfo);
    /*   return request({
      url: `${api_name}/saveAttrInfo/${attrInfo}`,
      method: "post"
    }); */
  },
  //根据某个平台实现的的ID获取里面所有的该平台属性值
  getAttrValueList(attrId) {
    return request({
      url: `${api_name}/getAttrValueList/${attrId}`,
      method: "GET"
    });
  }
};

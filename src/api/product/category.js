// 引入request
import request from "@/utils/request";
// 公共的根路径地址
const api_name = "/admin/product";
export default {
  geCategory1() {
    return request({
      url: `${api_name}/geCategory1`,
      method: "GET"
    });
  },
  geCategory2(category1Id) {
    return request({
      url: `${api_name}/geCategory2/${category1Id}`,
      method: "GET"
    });
  },
  geCategory3(category2Id) {
    return request({
      url: `${api_name}/geCategory3/${category2Id}`,
      method: "GET"
    });
  }
};

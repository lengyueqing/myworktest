import request from '@/utils/request'

export function login(data) {
  // 用户登录的api接口
  return request({
    // mock的数据，要用真是接口
    /*  url: '/vue-admin-template/user/login', */
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  // 获取用户信息
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // 退出
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

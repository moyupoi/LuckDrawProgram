import wepy from 'wepy'
import { service } from '../config.js'

export default class httpMixin extends wepy.mixin {
  /* =================== [$get 发起GET请求] =================== */
  $get(
    {url = '', headers = {}, data = {} },
    {success = () => {}, fail = () => {}, complete = () => {} }
  ) {
    const methods = 'GET'
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete }
    )
  }

  /* =================== [$post 发起POST请求] =================== */
  $post(
    {url = '', headers = {}, data = {} },
    {success = () => {}, fail = () => {}, complete = () => {} }
  ) {
    const methods = 'POST'
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete }
    )
  }

  /* =================== [$post 发起POST请求] =================== */
  $put(
    {url = '', headers = {}, data = {} },
    {success = () => {}, fail = () => {}, complete = () => {} }
  ) {
    const methods = 'PUT'
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete }
    )
  }

  /* =================== [$post 发起POST请求] =================== */
  $delete(
    {url = '', headers = {}, data = {} },
    {success = () => {}, fail = () => {}, complete = () => {} }
  ) {
    const methods = 'DELETE'
    this.$ajax(
      {url, headers, methods, data},
      {success, fail, complete }
    )
  }

  /**
   * [ajax 统一请求方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  $ajax(
    {url = '', headers = {}, methods = 'GET', data = {} },
    {success = () => {}, error = () => {}, fail = () => {}, complete = () => {} }
  ) {
    // 增强体验：加载中
    wx.showNavigationBarLoading()
    // 构造请求体
    const request = {
      url: url,
      method: ['GET', 'POST','PUT', 'DELETE'].indexOf(methods) > -1 ? methods : 'GET',
      header: Object.assign({
        'Authorization': wx.getStorageSync('accessToken'),
        'Content-Type': 'application/json'
      }, headers),
      data: Object.assign({
        // set something global
      }, data)
    }

    // 控制台调试日志
    // console.table(request)

    // 发起请求
    wepy.request(Object.assign(request, {
      success: ({ statusCode, data }) => {
        // 控制台调试日志
        console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100))
        if (statusCode == 200) {
          return setTimeout(() => {
            let successExist = this.isFunction(data)
            !successExist && success({statusCode: statusCode, data: data})
            this.$apply()
          })
        } else if (statusCode == 401) {
          let that = this
          wepy.login({
            success: res => {
              if (res.code) {
                wepy.request({
                  url: service.login,
                  method: 'POST',
                  data: {
                    code: res.code
                  },
                  success: function (res) {
                    wepy.setStorage({
                      key: 'accessToken',
                      data: res.data.access_token
                    })
                    var route = '/' + getCurrentPages()[0].__route__;
                    if (!res.data.access_token) {
                      wx.navigateTo({url: '/pages/user/register'})
                    } else {
                      that.$apply()
                      wx.reLaunch({url: route})
                    }
                  }
                })
              }
            }
          })
        }
      },
      fail: ({ statusCode, data }) => {
        // 控制台调试日志
        console.log('[ERROR]', statusCode, data)
        // 失败回调
        return setTimeout(() => {
          this.isFunction(error) && error({statusCode, ...data})
          this.$apply()
        })
      },
      complete: (res) => {
        // 控制台调试日志
        //console.log('[COMPLETE]', res)
        // 隐藏加载提示
        wx.hideNavigationBarLoading()
        // 停止下拉状态
        wx.stopPullDownRefresh()
        // 完成回调
        return (() => {
          let completeExist = this.isFunction(complete)
           completeExist && complete(res)
          this.$apply()
        })()
      }
    }))
  }
}

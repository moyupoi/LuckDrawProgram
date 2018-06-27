import wepy from 'wepy';
import { service } from '../config.js'
import http from '../mixins/http'
import base from '../mixins/base'

export default class ShareMessage extends wepy.mixin {
  onLoad(e) {
    wepy.showShareMenu({
      withShareTicket: true
    })
  }
  onShow(e) {
    wepy.showShareMenu({
      withShareTicket: true
    })
  }
  methods = {
    onShareAppMessage(res) {
      // return {
      //   success: (shar) => {
      //   },
      //   fail: (res) => {
      //   }
      // }
      let userId = this.$getUserId()
      let resData = res.source.data
      if (resData.bannerUrl && resData.isShare && resData.commodityId && resData.shareUrl && userId) {
        return {
          path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true&shereUserId=' + userId,
          imageUrl: resData.bannerUrl,
          title: resData.prizeName
        }
      } else if (resData.isShare && resData.commodityId && resData.shareUrl && userId) {
        return {
          path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true&shereUserId=' + userId
        }
      } else if (resData.isShare && resData.commodityId) {
        return {
          path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true'
        }
      } else if (resData.path) {
        return {
          path: resData.path
        }
      }
    }
  }
}

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
      let shereUserId = wepy.getStorageSync('userId')
      let resData = res.source.data
      if (resData.bannerUrl && resData.isShare && resData.shareUrlId && resData.shareUrl && shereUserId) {
        return {
          path: resData.shareUrl + '?id=' + resData.shareUrlId + '&share=true&shereUserId=' + shereUserId,
          imageUrl: resData.bannerUrl,
          title: resData.prizeName
        }
      } else if (resData.isShare && resData.shareUrlId && resData.shareUrl && shereUserId) {
        return {
          path: resData.shareUrl + '?id=' + resData.shareUrlId + '&share=true&shereUserId=' + shereUserId
        }
      } else if (resData.isShare && resData.shareUrlId) {
        return {
          path: resData.shareUrl + '?id=' + resData.shareUrlId + '&share=true'
        }
      } else if (resData.path) {
        return {
          path: resData.path
        }
      }
    }
  }
}

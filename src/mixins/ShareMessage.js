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
      if (res.source.data.isShare && res.source.data.shareUrlId && res.source.data.shareUrl && shereUserId) {
        return {
          path: res.source.data.shareUrl + '?id=' + res.source.data.shareUrlId + '&share=true&shereUserId=' + shereUserId
        }
      } else if (res.source.data.isShare && res.source.data.shareUrlId) {
        return {
          path: res.source.data.shareUrl + '?id=' + res.source.data.shareUrlId + '&share=true'
        }
      } else if (res.source.data.path) {
        return {
          path: res.source.data.path
        }
      }
    }
  }
}

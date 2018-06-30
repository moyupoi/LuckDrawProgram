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
      let shareData = {}
      debugger
      if (resData.isShare) {
        shareData.path = resData.shareUrl ? resData.shareUrl + '?id=' + resData.commodityId + '&share=true&shareUserId=' + userId : ''
        shareData.imageUrl = resData.shareBannerUrl ? resData.shareBannerUrl : ''
        shareData.title = resData.shareName ? resData.shareName : ''
        return {
          shareData
        }
      }
      
      // if (resData.shareBannerUrl && resData.isShare && resData.commodityId && resData.shareUrl && userId) {
      //   return {
      //     path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true&shareUserId=' + userId,
      //     imageUrl: resData.shareBannerUrl,
      //     title: resData.shareName
      //   }
      // } else if (resData.isShare && resData.commodityId && resData.shareUrl && userId) {
      //   return {
      //     path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true&shareUserId=' + userId
      //   }
      // } else if (resData.isShare && resData.commodityId) {
      //   return {
      //     path: resData.shareUrl + '?id=' + resData.commodityId + '&share=true'
      //   }
      // } else if (resData.path) {
      //   return {
      //     path: resData.path
      //   }
      // }
    }
  }
}

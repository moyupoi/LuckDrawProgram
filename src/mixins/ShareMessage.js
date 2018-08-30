import wepy from 'wepy';
import {
  service
} from '../config.js'
import http from '../mixins/http'
import base from '../mixins/base'

export default class ShareMessage extends wepy.mixin {
  mixins = [base]
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
      console.log('1??');
      let userId = this.$getUserId()
      let resData = res.source.data
      let shareData = {}
      let shareImageUrl = !this.isUndefined(resData.shareBannerUrl) ? resData.shareBannerUrl + '-share' : 'https://oss-lottery.xinyongjinku.com/strategy/share.png'
      let shareTitle = !this.isUndefined(resData.shareName) ? resData.shareName : '搞点福利'
      // shareTitle += '-自古城市套路深，还是福利得人心'
      let shareUrl = !this.isUndefined(resData.shareUrl) ? resData.shareUrl : getCurrentPages()[0].route
      if (!this.isUndefined(userId)) {
        shareUrl = shareUrl + '?shareUserId=' + userId + '&share=true'
        console.log('111' + shareUrl)
      }
      if (resData.commodityId) {
        console.log('1/resData.commodityId' + shareUrl + '&id=' + resData.commodityId)
        if (resData.groupId) {
          console.log(shareUrl + '&id=' + resData.commodityId + '&groupId=' + resData.groupId)
          return {
            path: shareUrl + '&id=' + resData.commodityId + '&groupId=' + resData.groupId,
            imageUrl: shareImageUrl,
            title: shareTitle
          }
        } else {
          console.log('commodityId'+resData.commodityId)
          return {
            path: shareUrl + '&id=' + resData.commodityId,
            imageUrl: shareImageUrl,
            title: shareTitle
          }
        }


      } else if (!this.isUndefined(resData.shareUrl)) {
        console.log('2/resData.shareUrl')
        return {
          path: shareUrl,
          imageUrl: shareImageUrl,
          title: shareTitle
        }
      } else {
        console.log('3/resData....')
        return {
          imageUrl: shareImageUrl,
          title: shareTitle
        }
      }
    }
  }
}

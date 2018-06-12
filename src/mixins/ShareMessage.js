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
      let formId = res.source.data.formId
      this.$get({
        url: service.collectFormId,
        headers: {
          'X-JINKU-WECHAT-FORM-ID': formId
        }
      }, {
        success: ({statusCode, data}) => {}
      })
    }
  }
}

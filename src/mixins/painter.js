import wepy from 'wepy'
import { service } from '../config.js'
import base from '../mixins/base'
export default class painterMixin extends wepy.mixin {
  mixins = [base]
  data = {
    canvasImg: ''
  }
  createCanvas() {
    var that = this
    let ctx = wepy.createCanvasContext('canvas', this)
    let scene = 'share_prize:' + this.commodityId + ':' + this.$getUserId()
    scene = service.wxacodeunlimit + '?scene=' + scene + '&page=' + this.shareUrl
    const booksPromise = new Promise((resolve, reject) => {
      ctx.save()
      ctx.beginPath()
      ctx.clip()
      wepy.getImageInfo({
        src: this.titaList.banner_url,
        success: (res) => {
          console.log('下载完成')
          ctx.restore()
          let obj = {
            titaList: that.titaList,
            path: res.path
          }
          resolve(obj)
        }
      })
    })
    const userPromise = new Promise((resolve, reject) => {
      ctx.save()
      ctx.beginPath()
      ctx.clip()
      wepy.getImageInfo({
        src: scene,
        success: (res) => {
          console.log('下载完成')
          ctx.restore()
          resolve(res.path)
        }
      })
    })
    Promise.all([booksPromise, userPromise]).then((result) => {
      // ctx.save()
      // ctx.beginPath()
      // ctx.clip()
      // ctx.arc(200 / 2 + left, 200 / 2 + top, 200 / 2, 0, Math.PI * 2, false)
      // ctx.clip()
      ctx.drawImage('../assets/images/painter/cavnasImg.png', 0, 0, 750, 1248)
      ctx.drawImage(result[0].path, 0, 0, 750, 450)
      ctx.drawImage(result[1], 225, 730, 300, 300)
      ctx.setFontSize(40)
      ctx.setFillStyle("#333333")
      ctx.fillText(result[0].titaList.name, 30, 530)
      ctx.setFontSize(30)
      ctx.setFillStyle("#FF4C21")
      ctx.fillText('已有' + result[0].titaList.prize_draws_count + '人次参加', 30, 590)
      ctx.draw()
    })

    setTimeout(function () {
      wepy.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function (res) {
          // that.setData({
          //   imagePath: tempFilePath,
          //   canvasHidden: false,
          //   maskHidden: true
          // })
　　　　　　//将生成的图片放入到《image》标签里
          that.canvasImg = res.tempFilePath
          console.log(that.canvasImg)
          // wx.previewImage({
          //   current: img, // 当前显示图片的http链接
          //   urls: [img] // 需要预览的图片http链接列表
          // })
        },
        fail: function (res) {
          // console.log(res)
        }
      })
    }, 2000)
  }
  // drawImage(ctx, url, left, top, width, height) {
  //   ctx.save()
  //   ctx.beginPath()
  //   ctx.arc(width / 2 + left, height / 2 + top, width / 2, 0, Math.PI * 2, false)
  //   ctx.clip()
  //   wepy.getImageInfo({
  //     src: url,
  //     success: (res) => {
  //       console.log('下载完成')
  //       ctx.drawImage(res.path, left, top, width, height)
  //       ctx.restore()
  //     }
  //   })
  // }
}

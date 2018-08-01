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
    const bannerPromise = new Promise((resolve, reject) => {
      wepy.getImageInfo({
        src: this.prizesDetails.banner_url,
        success: (res) => {
          console.log('下载完成')
          let obj = {
            prizesDetails: that.prizesDetails,
            path: res.path
          }
          resolve(obj)
        }
      })
    })
    const codePromise = new Promise((resolve, reject) => {
      wepy.getImageInfo({
        src: scene,
        success: (res) => {
          console.log('下载完成')
          resolve(res.path)
        }
      })
    })
    const portraitPromise = new Promise((resolve, reject) => {
      wepy.getImageInfo({
        src: this.prizesDetails.user_avatar_url,
        success: (res) => {
          console.log('下载完成')
          resolve(res.path)
        }
      })
    })
    Promise.all([bannerPromise, codePromise, portraitPromise]).then((result) => {
      // 绘制底色和背景
      ctx.drawImage('../assets/images/painter/cavnasImg.png', 0, 0, 750, 1368)
      // 绘制banner图
      ctx.drawImage(result[0].path, 0, 0, 750, 450)
      // 绘制小程序二维码
      ctx.drawImage(result[1], 225, 730, 300, 300)
      // 绘制商品名
      ctx.setFontSize(40)
      ctx.setFillStyle("#333333")
      ctx.fillText(result[0].prizesDetails.name, 30, 530)
      // 绘制已有xxx人参加
      ctx.setFontSize(30)
      ctx.setFillStyle("#FF4C21")
      ctx.fillText('已有' + result[0].prizesDetails.prize_draws_count + '人次参加', 30, 590)
      // 绘制一段话
      ctx.setFontSize(32)
      ctx.setFillStyle("#0B0A0A")
      let paragraph = '我是' + result[0].prizesDetails.user_nick_name + '邀你一起免费抽奖'
      if (paragraph.length > 17) {
        ctx.fillText(paragraph.substr(0, 17), 160, 1272)
        ctx.fillText(paragraph.substr(17, 17), 160, 1315)
      } else {
        ctx.fillText(paragraph, 160, 1300)
      }
      // 开始绘制头像
      ctx.beginPath()
      // 绘制圆形
      ctx.arc(90, 1270, 60, 0, 2 * Math.PI)
      // 切边
      ctx.clip()
      // 显示绘制圆的范围 测试用
      // ctx.fill()
      ctx.drawImage(result[2], 32, 1220, 108, 108)
      ctx.draw()
    })

    setTimeout(function () {
      wepy.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function (res) {
　　　　　　//将生成的图片放入到《image》标签里
          that.canvasImg = res.tempFilePath
          console.log(that.canvasImg)
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

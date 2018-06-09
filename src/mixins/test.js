import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    },
    bb () {
      console.log(33000)
    }
  }

  aa () {
    console.log(999)
  }

  onShow() {
    console.log('mixin onShow')

  }

  onLoad() {
    console.log('mixin onLoad')
  }
}

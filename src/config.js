/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
var host = 'https://api-lottery-pro.xinyongjinku.com'
// var host = ''
export const service = {
    // 登录接口
    login: `${host}/v1/users/wechat_login`,
    // 更新用户信息
    uploadWechatUserinfo: `${host}/v1/users/upload_wechat_userinfo`,
    // 分享获取fromid
    collectFormId: `${host}/v1/users/collect_form_id`,
    // 奖品列表 & 奖品详细 & 抽奖
    prizes: `${host}/v1/prizes/`,
    // 抽奖记录列表 & 抽奖记录详细 & 地址
    prizesDraws: `${host}/v1/prize_draws/`,
    // 头像列表
    portraitList: `${host}`,
    // 主域
    host
}

export default {
    service
}

/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
var host = 'https://api-lottery-pro.xinyongjinku.com'
// var host = ''
export const service = {
    // 登录接口
    login: `${host}/v1/users/wechat_login`,
    // 首页列表
    prizes: `${host}/v1/prizes`,
    // 主域
    host
}

export default {
    service
}

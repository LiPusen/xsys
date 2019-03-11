// 接口统一管理
const api = {
    getCode: { api: '/wp/web/defaultKaptcha', method: 'get' },
    login: { api: '/wp/web/login', method: 'post' },
    logout: { api: '/wp/web/logout', method: 'get' },
    getCaseList: { api: '/yc/case/list', method: 'get' },
    getAdvertiserList: { api: '/yc/advertiser/list', method: 'get' },
    getMediaList: { api: '/yc/media/list', method: 'get' },
    getChannelList: { api: '/yc/channel/list', method: 'get' },
    getAccountInfo: { api: '/wp/account/getAccountInfo', method: 'get' },
    updateAccount: { api: '/wp/account/updateAccount', method: 'post' },
    getAdvertiserAll: { api: '/wp/advertiser/all', method: 'get' },
    mediaAll: { api: '/yc/media/all', method: 'get' },
    getEventInfo: { api: '/yc/case/getById', method: 'get' },
    createChannel: { api: '/yc/channel/create', method: 'post' },
    updateChannel: { api: '/yc/channel/update', method: 'post' },
    getChannelInfo: { api: '/yc/channel/getById', method: 'get' },
    channelUpdateStatus: { api: '/yc/channel/updateStatus', method: 'post' },
    forgetPassword: { api: '/wp/account/forgetPassword', method: 'get' },
    getRoleList: { api: '/wp/user/getUserByRoleName', method: 'get' },
    getCountryList: { api: '/wp/api/area/get_all_countrys', method: 'get' },
    createCase: { api: '/yc/case/create', method: 'post' },
    updateCase: { api: '/yc/case/update', method: 'post' },
    getMater: { api: '/wp/adcreative/list', method: 'get' },
    getReport: { api: '/wp/adreport/list', method: 'get' },
    changeChannelStatus: { api: '/yc/channel/updateStatus', method: 'post'},
    createad: { api: '/wp/advertiser/create', method: 'post' },
    updatead: { api: '/wp/advertiser/update', method: 'post' },
    findCaseName: { api: '/yc/case/getByName', method: 'get' },
    getContract: { api: '/wp/api/contract/getContractNo', method: 'get'},
    checkAdname: { api: '/wp/advertiser/getByName', method: 'get'}
}
// 不同环境分发
// for(var k in api) {
//     if(process.env.NODE_ENV != 'development') {
//         api[k].api = htp.api + api[k].api.replace(/^\/[^\/]+/, '');
//     }
// }

export default api

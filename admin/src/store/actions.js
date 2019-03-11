import htp from '../http'
import { Message } from 'element-ui'

/**
 * 异步请求集中管理
 */
export default {
    aLogin({ commit }, data) {
        htp({ ur: 'login', options: data.ops }).then(res => {
            if (res.type == 'ok') {
                commit('mUserInfo', res.result)
            }
            data.callback && data.callback(res)
        }, er => {
            data.er && data.er()
            Message.error(er)
        })
    },
    aLogout({ commit }, data) {
    }
}

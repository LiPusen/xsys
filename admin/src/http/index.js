// 封装请求
import api from './api'
import rule from './rule'
import axios from 'axios'
// import store from '../store'
import { Message, Loading } from 'element-ui'

// 全局设置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const htp = axios.create({
	baseURL: '/',
    timeout: 2000
})

htp.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Authorization'] = localStorage.getItem('token')
	return config
}, err => {
    console.log('no sent:')
    console.log(err)
})

// htp.interceptors.response.use(response => { return response }, err => {})

// 服务器错误信息国际化
const lang = {
    en: 'The server responded incorrectly, please try again later',
    zh: '服务器未响应，请稍后重试',
    ja: 'サーバーが応答していません。しばらくしてからもう一度お試しください'
}

// 处理接口规范的公有方法
const server = ({ ur, options = {}}) => {
    let p;
    const d = Loading.service();
    // options = {...store.state.filterUpdata, ...options};
	switch (api[ur].method) {
		case 'get':
			p = new Promise(function(resolve, reject) {
				htp.get(api[ur].api, { params: options }).then(response => {
                    d.close()
					if (response.data.code) {
                        const body = {}
                        switch (response.data.code) {
                            case rule.ok:
                                body.type = 'ok'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.ercode:
                                body.type = 'vcode'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.out:
                                window.location.reload()
                                break
                            case rule.erauth:
                                window.localStorage.removeItem('token')
                                window.location.reload()
                                break
                            default:
                                Message.error(response.data.msg)
                                reject(response.data.msg)
                                break
                        }
                    }
				}, er => {
                    d.close()
					errHandler(er)
				})
			})
			break
		case 'post':
			p = new Promise(function(resolve, reject) {
				htp.post(api[ur].api, options).then(response => {
                    d.close();
                    if (response.data.code) {
                        const body = {}
                        switch (response.data.code) {
                            case rule.ok:
                                body.type = 'ok'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.ercode:
                                body.type = 'vcode'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.out:
                                window.location.reload()
                                break
                            case rule.erauth:
                                window.localStorage.removeItem('token')
                                window.location.reload()
                                break
                            default:
                                Message.error(response.data.msg)
                                reject(response.data.msg)
                                break
                        }
                    }
				}, er => {
                    d.close();
					errHandler(er)
				})
			})
			break
        default:
            d.close();
			break
	}
	return p
}

function errHandler(er) {
	Message.error(lang[localStorage.getItem('lang') || 'en'])
}

export default server

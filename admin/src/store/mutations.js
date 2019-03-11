export default {
    // 改变并记录菜单的打开状态
    mToggleBar(state) {
        state.sideopen = !state.sideopen
        if (state.sideopen) {
            window.localStorage.setItem('barSta', 1)
        } else {
            window.localStorage.setItem('barSta', 0)
        }
    },
    // 储存登录用户信息
    mUserInfo(state, data) {
        data.token && window.localStorage.setItem('token', data.token)
        data.menuList.forEach(m => (state.auth[m.menu] = m.button || []))
        state.userInfos = data.user
    },
    // 用户登出
    mLogout(state) {
    	window.localStorage.removeItem('token')
        state.userInfos = {}
        state.auth = {}
        state.menu = []
        state.isLogin = false
    },
    // 初始化完成，用户登录，一次应用执行一次
    mIslogin(state) {
        state.isLogin = true
    },
    // 注入导航路由
    mMenu(state, data) {
        // 菜单排序控制
        const sort = [{ name: 'home', icon: 'dashboard' }, { name: 'activemag', icon: 'activity' }, { name: 'adbbmag', icon: 'advertiser' }, { name: 'material', icon: 'material' }, { name: 'report', icon: 'report' }, { name: 'settle', icon: 'settlement' }]
        // 数组对象化
        const uu = {}
        const u = []
        // 装配菜单路由
        data.forEach((item) => {
            if (item.meta.tree) {
                !uu[item.meta.tree] && (uu[item.meta.tree] = [])
                uu[item.meta.tree].push(item)
            } else {
                uu[item.name] = item
            }
        })
        sort.forEach((m, k) => {
            if (uu[m.name]) {
                if (uu[m.name].length) {
                    const mm = uu[m.name]
                    uu[m.name] = { ...m, redirect: mm[0].path, children: mm }
                } else {
                    uu[m.name] = { ...uu[m.name], ...m }
                }
                u.push(uu[m.name])
            }
        })

        state.menu = u
    },
    // 筛选弹框组件打开与否状态
    mPop(state, data) {
        state.poper = data == 'close' ? false : !state.poper
    },
    mFilter(state, data) {
        state.filterData = JSON.parse(JSON.stringify(data))
    },
    mFilterUpdata(state, data) {
        state.filterUpdata = JSON.parse(JSON.stringify(data))
    },
    mRes(state, data) {
        state.res = JSON.parse(JSON.stringify(data))
    },
    mRouts(state, data) {
        state.routs = JSON.parse(JSON.stringify(data))
    }
}

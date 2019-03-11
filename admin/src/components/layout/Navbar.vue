<template>
    <el-menu class="navbar" mode="horizontal">
        <div class="expand fl" @click="toggleSideBar">
            <v-icon :icon-class="sideopen ? 'collapse' : 'expand'"></v-icon>
            <span style="padding: 0 8px;">{{ sideopen ? '收起菜单' : '展开菜单' }}</span>
        </div>
        <div class="right-menu fr">
            <!-- <search /> -->
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    {{userInfos.role}} <span class="user-name">{{ userInfos.name || 'admin' }}</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/accountSetting">
                        <el-dropdown-item>
                            用户设置
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span @click="logout" style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'

    export default {
        name: "gNav",
        props: {
            on: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState(['sideopen', 'userInfos'])
        },
        methods: {
            ...mapMutations(['mToggleBar']),
            ...mapActions(['aLogout']),
            toggleSideBar() {
                this.mToggleBar();
            },
            logout() {
                this.aLogout({
                    callback: (res) => {
                        this.$router.push({
                            path: '/login'
                        })
                    },
                    er: () => {}
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;

        .expand {
            position: relative;
            line-height: 50px;
            height: 50px;
            padding: 0 30px;
            font-size: 14px;
            color: #8F979F;
            cursor: pointer;
        }

        .logo {
            margin-top: 10px;
            width: 110px;
            height: 30px;
        }

        .right-menu {
            height: 100%;

            &:focus {
                outline: none;
            }

            .avatar-container {
                height: 50px;
                margin-right: 30px;

                .avatar-wrapper {
                    position: relative;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #8F979F;
                    margin-top: 5px;
                    cursor: pointer;

                    .user-name {
                        color: #12123C;
                    }
                }
            }
        }
    }
</style>

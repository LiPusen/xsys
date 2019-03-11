<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span v-if="item.redirect === 'noredirect' || index === levelList.length - 1" class="no-redirect">{{ $i18nAdapt("route." + item.name) }}</span>
                <router-link v-else :to="item.redirect || item.path">{{ $i18nAdapt("route." + item.name) }}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                levelList: null
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb() {
                console.log(this.$route, 'this.$route')
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                if (first && first.name !== 'home') {
                    matched = [{
                        path: '/active',
                        name: 'activemag'
                    }].concat(matched)
                }
                this.levelList = matched
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>

<template>
    <v-sobar>
        <div class="logo">
            <v-icon icon-class="logo"></v-icon><span v-if="sideopen"> Act Now</span>
        </div>
        <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="!sideopen" text-color="#8F979F" active-text-color="#0035C2">
            <v-sitem v-for="item in routs" :key='item.path' :item='item' />
        </el-menu>
    </v-sobar>
</template>

<script>
    import { mapState } from 'vuex'
    import SidebarItem from './SidebarItem'

    export default {
        components: { SidebarItem },
        computed: {
            ...mapState(['sideopen', 'routs'])
        }
    }
</script>

<style lang="less" scoped>
    .logo{
        width: 100%;
        height: 60px;
        font-size: 35px;
        color: #3eaf7c;
        text-align: center;
        padding-top: 8px;
        overflow: hidden;
        span {
            font-size: 24px;
            color: #ff9900;
        }
    }
</style>

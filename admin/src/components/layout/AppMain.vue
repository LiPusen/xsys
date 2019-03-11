<template>
    <section class="layout-main">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="pop" mode="out-in">
            <v-pop v-if="poper" />
        </transition>
    </section>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'AppMain',
        computed: {
            ...mapState(['poper'])
        },
        created() {
        },
        methods: {
            ...mapActions([])
        }
    }
</script>
<style lang="less" scoped>
    .layout-main {
        width: 100%;
        height: 100%;
        padding: 30px;
        overflow: auto;
    }
</style>

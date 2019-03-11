<template>
    <div class="p404">
        <div class="p404-box">
            <h1>404</h1>
            <p>访问路径出错?点击下面按钮返回首页试试！</p>
            <el-button type="success" @click="goHome">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page404',
        data() {
            return {
                styles: {
                    fontSize: 0,
                    height: 0
                }
            }
        },
        computed: {},
        created() {
            this.styles.fontSize = document.body.clientHeight * 0.75 + 'px';
            this.styles.height = document.body.clientHeight * 0.75 + 'px';
        },
        methods: {
            goHome() {
                this.$router.push({ path: '/' })
            }
        }
    }
</script>

<style lang="less" scoped>
    .p404 {
        position: relative;
        width: 100%;
        height: 100%;
        // background: linear-gradient(0deg, #414141 0, #373636);
        // box-shadow: inset 0 2px 10px #aaa;
        overflow: hidden;
        &-box {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 350px;
            height: 350px;
            text-align: center;
            h1 {
                font-size: 100px;
                line-height: 130px;
                color: #888;
                -webkit-text-fill-color: #ccc;
                -webkit-text-stroke: 1px #888;
                letter-spacing: 5px;
                margin: 0;
                text-shadow: 0 2px 8px #bbb;
            }
            p {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 16px;
                line-height: 26px;
                color: #333;
                margin-bottom: 30px;
            }
        }
    }
</style>

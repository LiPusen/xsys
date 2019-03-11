<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div class="international-icon">
            <span v-if="language==='zh'">中文</span>
            <span v-if="language==='en'">English</span>
            <span v-if="language==='ja'">日本語</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <!--<v-icon class-name='international-icon' icon-class="language"/>-->
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
            <el-dropdown-item command="ja" :disabled="language==='ja'">日本語</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        data() {
            return {
                language: window.localStorage.getItem('lang') || 'en'
            }
        },
        created() {
        },
        methods: {
            handleSetLanguage(lang) {
                // 国际化语言切换
                this.language = lang
                this.$i18n.locale = lang;
                this.$message({
                    message: 'switch language success',
                    type: 'success'
                })
                this.$emit('changeLang', lang)
            }
        }
    }
</script>

<style scoped>
    .international-icon {
        font-size: 14px;
        cursor: pointer;
        vertical-align: -5px !important;
        color:#12123C;
        line-height:16px;
    }
</style>
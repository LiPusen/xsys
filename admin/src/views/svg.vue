<template>
    <div class="icons-container">
        <div class="b-con-title">
            <h1>SVG图标</h1>
        </div>
        <div class="icons-wrapper">
            <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
                <el-tooltip placement="top">
                    <div slot="content">
                        {{ generateIconCode(item) }}
                    </div>
                    <div class="icon-item">
                        <v-icon class-name="disabled" :icon-class="item" />
                        <span>{{ item }}</span>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import icons from '@/icons/index'
    import clipboard from '@/utils/clipboard'

    export default {
        name: 'Icons',
        data() {
            return {
                iconsMap: []
            }
        },
        mounted() {
            const iconsMap = icons.iconMap.map((i) => {
                return i.default.id.split('-')[1]
            })
            this.iconsMap = iconsMap
        },
        methods: {
            generateIconCode(symbol) {
                return `<v-icon icon-class="${symbol}" />`
            },
            handleClipboard(text, event) {
                clipboard(text, event)
            }
        }
    }
</script>

<style lang="less" scoped>
    .icons-container {
        margin: 10px 20px 0;
        overflow: hidden;

        .icons-wrapper {
            margin: 0 auto;
        }

        .icon-item {
            margin: 20px;
            height: 110px;
            text-align: center;
            width: 110px;
            float: left;
            font-size: 30px;
            color: #24292e;
            cursor: pointer;
        }

        span {
            display: block;
            font-size: 24px;
            margin-top: 10px;
        }

        .disabled {
            pointer-events: none;
        }
    }
</style>

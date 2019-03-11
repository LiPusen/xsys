<template>
    <div class="carous">
        <div :style="{height: height + 'px'}" class="carous-view">
            <img :src="pre[i].src" alt="preview" srcset="" class="t-timg" v-if="pre[i].type == 1" >
            <video :src="pre[i].src" v-if="pre[i].type == 2" class="t-tv" controls></video>
            <p v-if="pre[i].type == 3" class="t-tx">{{pre[i].src}}</p>
        </div>
        <div class="carous-btn">
            <i class="el-icon-arrow-left pointer" style="margin-right: 5px;" @click="run('-')"></i>
            <template v-for="sp in pre.length">
                <div :key="sp" :class="{cur: i == (sp - 1)}" :data-n="sp"></div>
            </template>
            <i class="el-icon-arrow-right pointer" style="margin-left: 5px;" @click="run('+')"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: "carous",
    props: {
        pre: {
            type: Array, 
            default() {
                return []
            }
        },
        height: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            i: 0
        }
    },
    created() {
        this.i = this.index;
    },
    methods: {
        run(d) {
            if (d == '-') {
                this.i = this.i <= 0 ? 0 : (this.i - 1)
            } else {
                this.i = this.i >= (this.pre.length - 1) ? (this.pre.length - 1) : (this.i + 1)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .carous {
        position: relative;
        width: 100%;
        height: auto;
        &-view {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
        }
        &-btn {
            position: relative;
            font-size: 14px;
            color: #8f979f;
            width: 100%;
            height: 70px;
            line-height: 70px;
            text-align: center;
            div {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #e4e6ec;
                border-radius: 50%; 
                margin: 1px 5px;
                &.cur {
                    background-color: #8f979f;
                }
            }
        }
    }
</style>

<template>
    <el-row class="b-input" :gutter="gutter">
        <el-col :span="spanr" class="b-input-info">
            <h3 v-text="title"></h3>
            <p v-text="desc"></p>
        </el-col>
        <el-col :span="spanl" class="b-input-main">
            <slot></slot>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: "b-top",
    props: {
        title: {
            type: String, 
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        gutter: {
            type: Number,
            default: 30
        },
        spanr: {
            type: Number,
            default: 8
        },
        spanl: {
            type: Number,
            default: 16
        }
    }
}
</script>
<template>
    <el-row class="b-con-top">
        <el-col :span="8"><h1>{{title}}</h1></el-col>
        <el-col :span="8" class="b-con-top-item t-txc">
            <slot name="m"></slot>
        </el-col>
        <el-col :span="8" class="b-con-top-item t-txr">
            <slot name="r"></slot>
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
        }
    }
}
</script>

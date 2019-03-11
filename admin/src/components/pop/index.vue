<template>
    <div class="poper" ref="pop">
        <div class="poper-head">
            <aside class="poper-head-left b-fc fl">{{$i18nAdapt('pop.name')}}</aside>
            <aside class="poper-head-right b-fc fr pointer" @click="mPop"><v-icon icon-class="expand"></v-icon></aside>
        </div>
        <div class="poper-body">
            <el-form :rules="rules" ref="poper" :model="updata" label-position="top" hide-required-asterisk >
                <template v-for="(item, index) in filterData.form">
                    <el-form-item :label="item.label" :prop="item.key" :key="index" v-if="item.type == 'text'">
                        <el-input v-model.trim="updata[item.key]" :placeholder="item.tip"></el-input>
                    </el-form-item>
                    <el-form-item :label="item.label" :prop="item.key" :key="index" v-if="item.type == 'select'">
                        <el-select v-model="updata[item.key]" :placeholder="item.tip">
                            <el-option v-for="im in item.sl" :key="im.val" :label="im.label" :value="im.val"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.label" :prop="item.key" :key="index" v-if="item.type == 'checkbox'">
                        <el-checkbox-group v-model="updata[item.key]">
                            <el-col :span="12" v-for="im in item.sl" :key="im.val"><el-checkbox :label="im.val">{{im.label}}</el-checkbox></el-col>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="item.label" :key="index" v-if="item.type == 'amountrang'" required>
                        <el-col :span="11">
                            <el-form-item :prop="item.rang.s" style="padding: 0;">
                                <el-input :placeholder="item.rang.stip" v-model.trim="updata[item.rang.s]">
                                    <template slot="prepend">$</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" style="height: 100%;">~</el-col>
                        <el-col :span="11">
                            <el-form-item :prop="item.rang.e" style="padding: 0;">
                                <el-input :placeholder="item.rang.etip" v-model.trim="updata[item.rang.e]">
                                    <template slot="prepend">$</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-form-item :label="item.label" :prop="item.key" :key="index" v-if="item.type == 'daterang'">
                            <el-date-picker v-model="updata[item.key]" type="daterange" range-separator="~" :start-placeholder="item.rang.stip" :end-placeholder="item.rang.etip" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                </template>
            </el-form>
        </div>
        <div class="poper-foot">
            <el-button type="primary" size="small" @click.native="apply" v-waves >{{$i18nAdapt('pop.apply')}}</el-button>
            <el-button size="small" @click.native="reset" v-waves >{{$i18nAdapt('pop.reset')}}</el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "poper",
    data() {
        return {
            rules: {},
            updata: {}
            // filterData: {
            //     form: [{
            //         key: 'active',
            //         val: '你猜我会不会猜',
            //         rule: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
            //         label: '活动名称',
            //         tip: '输入活动名称',
            //         type: 'text'
            //     }, {
            //         label: '金额段',
            //         rang: {
            //             s: 'start',
            //             sv: '100',
            //             srule: [{ required: true, message: '请输入金额1', trigger: 'blur' }],
            //             stip: '开始吧',
            //             e: 'end',
            //             ev: '1000',
            //             erule: [{ required: true, message: '请输入金额2', trigger: 'blur' }],
            //             etip: '结束吧'
            //         },
            //         type: 'amountrang'
            //     }],
            //     save: d => {
            //         console.log(d)
            //     }
            // }
        }
    },
    computed: {
        ...mapState(['filterData'])
    },
    created() {
        const that = this;
        this.filterData.form && this.filterData.form.forEach(k => {
            k.key && that.$set(that.updata, k.key, k.val);
            k.key && that.$set(that.rules, k.key, k.rule);
            if (/rang$/.test(k.type)) {
                k.rang.s && that.$set(that.updata, k.rang.s, k.rang.sv);
                k.rang.e && that.$set(that.updata, k.rang.e, k.rang.ev);
                k.rang.s && k.rang.srule && that.$set(that.rules, k.rang.s, k.rang.srule);
                k.rang.e && k.rang.erule && that.$set(that.rules, k.rang.e, k.rang.erule);
            }
        })
        this.filterData.add && (this.updata = {...this.updata, ...this.filterData.add})
    },
    mounted() {
        const _this = this;
        const handle = function(e) {
            if (_this.$refs['pop'] && _this.$refs['pop'].contains(e.target)) {
                return
            } else {
                _this.mPop('close');
                document.removeEventListener("click", handle, false)
            }
        }
        document.addEventListener("click", handle, false)
    },
    methods: {
        ...mapMutations(['mPop', 'mFilterUpdata']),
        apply() {
            const that = this;
            this.$refs['poper'].validate((valid) => {
                if (valid) {
                    that.mFilterUpdata(that.updata)
                    that.filterData.save && that.$store.dispatch(that.filterData.save)
                } else {
                    return false;
                }
            });
        },
        reset() {
            this.$refs['poper'].resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
    .poper {
        position: absolute;
        top: 0;
        right: 0;
        width: 350px;
        height: 100%;
        padding: 90px 0 70px;
        overflow-x: hidden;
        background-color: #F6F7FA;
        box-shadow: -4px 0px 8px 0px rgba(23,25,29,0.24);
        z-index: 10;
        &-head {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 90px;
            font-size: 0;
            clear: both;
            overflow: hidden;
            &-left {
                margin: 30px 0 0 30px;
                font-size: 32px;
            }
            &-right {
                margin: 40px 30px 0 0;
                font-size: 16px;
            }
        }
        &-body {
            position: relative;
            width: 100%;
            max-height: 100%;
            padding: 30px;
            overflow: auto;
        }
        &-foot {
            position: relative;
            // position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            padding: 15px 30px 0;
            text-align: left;
        }
    }
</style>

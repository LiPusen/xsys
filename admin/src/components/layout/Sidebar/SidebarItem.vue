<template>
    <div class="menu-wrapper" v-if="(item.children || isNest) && !item.hidden">
        <router-link v-if="isMenu()" :to="resolvePath(one.path)">
            <el-menu-item :index="resolvePath(one.path)" :class="{'submenu-title-noDropdown': !one.children}">
                <v-icon v-if="one.meta.icon" :icon-class="one.meta.icon" />
                <span slot="title">{{ one.meta.title }}</span>
            </el-menu-item>
        </router-link>
        <el-submenu ref="subMenu" v-else :index="resolvePath(one.path)">
            <template slot="title">
                <v-icon v-if="one.meta.icon" :icon-class="one.meta.icon" />
                <span slot="title">{{ one.meta.title }}</span>
            </template>
            <v-sitem v-for="c in one.children" :key='c.path' :item='c' :is-nest="true" :pth="resolvePath(one.path) + '/'"/>
        </el-submenu>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            isNest: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                required: true
            },
            pth: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                one: null
            }
        },
        created() {
        },
        methods: {
            isMenu() {
                if (this.isNest) {
                    this.one = {...this.item}
                } else {
                    const meta = this.item.meta || this.item.children[0].meta || {};
                    const children = this.item.children.filter(c => !c.hidden);
                    this.one = children.length ? {path: this.item.path, meta, children} : {path: this.item.path, meta};
                }
                return !this.one.children
            },
            resolvePath(rp) {
                return this.Tool.regs(rp, 'isLink') ? rp : (this.pth + rp)
            }
        }
    }
</script>
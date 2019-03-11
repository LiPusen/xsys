<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div :style="{top: top + 'px'}" class="scroll-wrapper" ref="scrollWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    const delta = 15

    export default {
        name: 'ScrollBar',
        data() {
            return {
                top: 0
            }
        },
        methods: {
            handleScroll(e) {
                const eventDelta = e.wheelDelta || -e.deltaY * 3
                const $container = this.$refs.scrollContainer
                const $containerHeight = $container.offsetHeight
                const $wrapper = this.$refs.scrollWrapper
                const $wrapperHeight = $wrapper.offsetHeight
                if (eventDelta > 0) {
                    this.top = Math.min(0, this.top + eventDelta)
                } else {
                    if ($containerHeight - delta < $wrapperHeight) {
                        if (this.top < -($wrapperHeight - $containerHeight + delta)) {
                            this.top = this.top
                        } else {
                            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
                        }
                    } else {
                        this.top = 0
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .scroll-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 1px 0px 1px #eee;

        .scroll-wrapper {
            position: absolute;
            width: 100% !important;
        }
    }
</style>

<template>
    <section>
        <Headrbar />
        <section class="app-wrapper">
            <sidebar />
            <ContentMain />
        </section>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/25
     * @desc 页面三大组件Navbar、Sidebar、ContentMain存放Layout.vue组件内
     */

    import { Headrbar, Sidebar, ContentMain } from './components'

    export default {
        name: 'Layout',
        components: {
            Headrbar,
            Sidebar,
            ContentMain
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

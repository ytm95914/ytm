<template>
    <section class="al-mainInner">
        <router-view v-if="isRouterAlive"/>
    </section>
</template>

<script>
    export default {
        name: 'App',
        provide(){
            return {
                reload:this.reload
            }
        },
        data(){
            return {
                isRouterAlive : true,
            }
        },
        methods:{
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    //import reset scss
    @import '@/styles/comm/element-ui.scss';
</style>

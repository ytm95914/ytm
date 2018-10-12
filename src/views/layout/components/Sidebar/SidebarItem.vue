<template>
    <section class="menu-wrapper">
        <Entrance :which="flag"></Entrance>
        <template v-for="item in routes" v-if="!item.hidden&&item.children">

            <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path" >
                <el-menu-item :index="item.path+'/'+item.children[0].path">
                    <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
                    <span slot="title">{{item.children[0].meta.title}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/25
     * @desc 侧导航组件sidebar
     */
    import Entrance from './Entrance'
    import TempCache from '@/utils/tempcache'

    export default {
        name: 'SidebarItem',
        props: {
            routes: {
                type:Array
            }
        },
        data(){
            return {
                flag:7
            }
        },
        components:{
            Entrance
        },
        methods: {
            hasOneShowingChildren(children) {
                const showingChildren = children.filter(item => {
                    return !item.hidden
                });
                if (showingChildren.length === 1) {
                    return true
                }else{
                    return false
                }
            }
        },
        mounted(){
            let types = TempCache.getItem('userRole');
            this.flag = types.role;
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>


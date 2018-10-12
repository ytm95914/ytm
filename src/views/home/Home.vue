<template>
    <section class="mainInner">
        <Dimission />
        <Added />
        <ImportDaily></ImportDaily>
        <el-button @click="test1">成功</el-button>
        <el-button @click="test2">警告</el-button>
        <el-button @click="test3">消息</el-button>
        <el-button @click="test4">错误</el-button>
        <ProjectAndGroup @projectId='getProjectId' @groupId='getGroupId'></ProjectAndGroup>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/30
     * @desc dashboard页面，首屏展示内容
     */
    import Dimission from '@/components/Popup/Dimission'
    import Added from '@/components/Popup/Added'
    import comm from '@/utils/comm'
    import ImportDaily from '@/components/Popup/Importdaily'
    import ProjectAndGroup from '@/views/system/user/components/ProjectAndGroup'

    export default {
        name: "Home",
        data(){
            return {
                dialogVisible:false
            }
        },
        components:{
            Dimission,
            Added,
            ImportDaily,
            ProjectAndGroup
        },
        methods:{
            //comm.successRemid(this,'提示内容'[,'标题参数'])
            //标题参数默认可选
            test1(){
                comm.successRemid(this,'我应该是测试内容');
                // comm.successRemid(this,'我应该是测试内容','提示');
            },
            test2(){
                comm.warnRemid(this,'我应该是测试内容')
            },
            test3(){
                comm.infoRemid(this,'我应该是测试内容')
            },
            test4(){
                comm.errorRemid(this,'我应该是测试内容')
            },
            getProjectId(val){
            	console.log(val)
            },
            getGroupId(val){
            	console.log(val)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .mainInner{

    }
</style>

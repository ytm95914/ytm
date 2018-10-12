<template>
    <section class="nav-entrance">
        <p class="nav-title">快速入口</p>

        <article class="nav-content">
            <p @click="importAttendance"><svg-icon icon-class="entrance-import"/><span>导入考勤</span></p>
            <!--<p><svg-icon icon-class="entrance-scheduling" /><span>导入排班</span></p>-->
        </article>

        <article class="nav-content" v-if="which==2222">
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-allocation" /><span>订单分配</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
        </article>

        <article class="nav-content" v-if="which==32222">
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
            <p><svg-icon icon-class="entrance-attendance" /><span>打卡</span></p>
        </article>

        <article class="nav-content" v-if="which==4222">
            <p  @click="importAttendance"><svg-icon icon-class="entrance-import" /><span>导入考勤</span></p>
            <p><svg-icon icon-class="entrance-scheduling" /><span>导入排班</span></p>
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-allocation" /><span>订单分配</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
        </article>

        <article class="nav-content" v-if="which==222">
            <p  @click="importAttendance"><svg-icon icon-class="entrance-import" /><span>导入考勤</span></p>
            <p><svg-icon icon-class="entrance-scheduling" /><span>导入排班</span></p>
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
            <p><svg-icon icon-class="entrance-attendance" /><span>打卡</span></p>
        </article>

        <article class="nav-content" v-if="which==6">
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-allocation" /><span>订单分配</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
            <p><svg-icon icon-class="entrance-attendance" /><span>打卡</span></p>
        </article>

        <article class="nav-content" v-if="which==7222">
            <p  @click="importAttendance"><svg-icon icon-class="entrance-import" /><span>导入考勤</span></p>
            <p><svg-icon icon-class="entrance-scheduling" /><span>导入排班</span></p>
            <p><svg-icon icon-class="entrance-exportdaily" class="imports"/><span>导入日报</span></p>
            <p><svg-icon icon-class="entrance-allocation" /><span>订单分配</span></p>
            <p><svg-icon icon-class="entrance-arrange" /><span>排班</span></p>
            <p><svg-icon icon-class="entrance-attendance" /><span>打卡</span></p>
        </article>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/9/6
     * @desc 动态入口
     * @module 1.表示主管 --- 2.表示组长 --- 3.表示员工 --- 4.主管和组长 --- 5.主管和员工 --- 6.组长和员工 --- 7.全选
     */
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Entrance",
        props: ['which'],
        methods:{
            importAttendance(){
                this.setAttendance(true)
            },
            ...mapActions(['setAttendance']),
        },
        mounted(){
            // let newData  = [
            //     {
            //         id:1,
            //         name:'主管'
            //     },
            //     {
            //         id:2,
            //         name:'管理员'
            //     },
            //     {
            //         id:3,
            //         name:'PM'
            //     }
            // ]
            // newData.map((val,index)=>{
            //     if(val.id==1){
            //         alert(val.name)
            //     }
            // })
            // newData.some(function(res){
            //     if(res.id==1){
            //         alert(res.name)
            //     }
            // })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .nav-entrance{
        padding:25px 30px 28px;
        .nav-title{
            font-size: 14px;
            color: #A6B7BF;
            letter-spacing: 0;
            margin-bottom: 14px;
        }
        .nav-content{
            p{
                width:80px;
                height:29px;
                line-height: 29px;
                text-align: left;
                font-size:12px;
                color:#54667A;
                margin-bottom: 4px;
                cursor:pointer;
                background:#fff;
                padding:12px 0 12px 12px;
                display: inline-block;
                .imports{
                    vertical-align: -0.2em;
                }
            }
        }
    }
</style>

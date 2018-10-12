<template>
    <section class="choice">
        <div class="choice_left">
            <i>统计区间</i>
            <el-button v-for="(item,index) in timeView" :key="index" :class="{span_active:index==isActive}" @click="changeTimeview(index)"> {{ item.name}} </el-button>
        </div>
        <div class="choice_right">
            <div class="block" v-for="(item,index) in choiceDate" v-if="index == isActive">
                <el-date-picker v-model="regDateBeg" :type="item.type" :placeholder="item.placeholder">
                </el-date-picker>
            </div>
        </div>
    </section>
</template>

<script>
    /**
     * @author Shumei Zhao
     * @date 2018/8/23
     * @desc [排班管理] 页面切换按钮 \src\views\scheduling\SchedulingManage
     * @module 组件引用位置
     */
    import { mapGetters, mapActions } from 'vuex'
    import commdate from '@/utils/commdate'
    export default {
        name: "arrangeSwitch",
        data(){
            return {
                regDateBeg: new Date(), // 默认显示当前日期
                isActive: 0,
                timeView: [{ name: "日" }, { name: "月" }, { name: "年" }],
                choiceDate: [
                    { type: "date", placeholder: "选择日期" },
                    { type: "month", placeholder: "选择月" },
                    { type: "year", placeholder: "选择年" }
                ],
            }
        },
        computed: {
            ...mapGetters([
                'getArrangeDate',
                'getArrangeTime'
            ])
        },
        methods:{
            changeTimeview(index) {
                this.isActive = index;
                this.setArrangeDate(index+1);
            },
            ...mapActions([
                'setArrangeDate',
                'setArrangeTime'
            ])
        },
        watch:{
            regDateBeg(){
                let date;
                switch(this.isActive+1){
                    case 1:
                        date = commdate.timestampToTime(this.regDateBeg);break;
                    case 2:
                        date = commdate.timestampToTime(this.regDateBeg).substr(0,8)+commdate.timestampToTime(this.getArrangeTime).substr(8,10);break;
                    case 3:
                        date = commdate.timestampToTime(this.regDateBeg).substr(0,5)+commdate.timestampToTime(this.getArrangeTime).substr(5,10);break;
                }
                this.regDateBeg = date;
                this.setArrangeTime(date);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

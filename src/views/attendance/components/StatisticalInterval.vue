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
	import { mapGetters,mapActions } from 'vuex'
    import commdate from '@/utils/commdate'

	export default {
		data(){
			return {
                regDateBeg: new Date(), // 默认显示当前日期
                isActive: 0,
                timeView: [{ name: "日" }, { name: "月" }, { name: "年" }],
                choiceDate: [
                    { type: "date", placeholder: "选择日期" },
                    { type: "month", placeholder: "选择月" },
                    { type: "year", placeholder: "选择年" }
                ]
			}
		},
		methods:{
            changeTimeview(index) {
                this.isActive = index;
                let str = '';
                switch(index+1){
                    case 1:
                        str = 'day';break;
                    case 2:
                        str = 'month';break;
                    case 3:
                        str = 'year';break;
                }
                this.setFlag(str);
            },
			...mapActions([
				'setDate',
				'setFlag'
            ]),

		},
		computed:{
			...mapGetters([
				'getDate',
				'getFlag'
            ]),
		},
		watch:{
            regDateBeg(){
                let date;
                switch(this.getFlag){
                    case 'day' :
                        date = this.regDateBeg;break;
                    case 'month':
                        date = commdate.timestampToTime(this.regDateBeg).substr(0,8)+commdate.timestampToTime(this.getDate).substr(8,10);break;
                    case 'year' :
                        date = commdate.timestampToTime(this.regDateBeg).substr(0,5)+commdate.timestampToTime(this.getDate).substr(5,10);break;
                }
                this.regDateBeg = date;
                this.setDate(date);
            }
		}
	}
</script>
<style lang="scss" scoped>
    .choice {
        height: 36px;
        padding: 22px 0px 26px;
        .choice_left {
            float: left;
            i {
                font-size: 12px;
                color: #333333;
            }
            .el-button {
                background: #F2F7F8;
                width: 70px;
            }
            .span_active {
                background: #11A0F8;
                color: #fff;
            }
        }
        .choice_right {
            width: 140px;
            float: right;
            .block {
                width: 100%;
                height: 100%;
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    width: 100% !important;
                    height: 100% !important;
                }
            }
        }
    }
</style>

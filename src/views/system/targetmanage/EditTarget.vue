<template>
    <section>
        <p class="crumbs"><span @click="goBack">指标管理 > </span><span>指标编辑</span></p>
        <div class="newTarget">
            <div v-if="type == 'zbfl'">
                <span class="name xinghao">指标分类名称：</span><el-input v-model.trim="targetNamefl" placeholder="请输入内容"></el-input>
                <span class="name xinghao">指标分类编号：</span><el-input v-model.trim="targetNumberfl" placeholder="请输入内容"></el-input>
                <div style="margin:20px 0px 20px 0px"></div>
                <span class="name inlineblock fl xinghao">指标分类说明：</span>
                <el-input
                    :autosize="{ minRows: 8, maxRows: 10}"
                    type="textarea"
                    size="medium"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model.trim="targetTypeExplain">
                </el-input>
            </div>
            <div v-else>
                <span class="name xinghao">名称：</span><el-input v-model.trim="targetNamegl" placeholder="请输入内容"></el-input>
                <span class="name xinghao">编号：</span><el-input v-model.trim="targetNumbergl" placeholder="请输入内容"></el-input>
                <span class="name bxinghao">指标类型：</span>
                <el-select v-model="targetTypegl" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div style="margin:20px 0px 20px 0px"></div>
                <span class="name bxinghao">单位：</span>
                <el-select v-model="companygl" placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div style="margin:20px 0px 20px 0px"></div>
                <span class="name inlineblock fl xinghao">指标<br>&nbsp;说明：</span>
                <el-input
                    style="width:92%;"
                    :autosize="{ minRows: 8, maxRows: 10}"
                    type="textarea"
                    size="medium"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model.trim="targetExplaingl">
                </el-input>
            </div>
            <div style="width: 211px;margin: 0 auto;margin-top: 177px;">
                <el-button type="success" @click="save" >保存</el-button>
                <el-button type="info" @click="goBack" >取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
	import commjs from '@/utils/comm.js'
	export default {
		data(){
			return {
				type:'',
				targetNamefl:'',
				targetNumberfl:'',
				targetTypeExplain: '',
				targetNumbergl:'',
				targetNamegl:'',
				targetExplaingl:'',
				options: [{
					value: '选项1',
					label: '基础审核数据'
				}, {
					value: '选项2',
					label: '质检数据'
				}],
				targetTypegl: '',
				options1: [{
					value: '选项1',
					label: '条'
				}, {
					value: '选项2',
					label: '万元'
				},{
					value: '选项3',
					label: '次'
				}],
				companygl: '',
			}
		},
		methods:{
			getType(){
				this.type = this.$route.params.type;
			},
			goBack(){
				window.history.go(-1);
			},
			save(){
				if(this.type == 'zbfl'){
					if(this.targetNamefl == '' || this.targetNumberfl == '' || this.targetTypeExplain == ''){
						commjs.open(this,'请填写必填项！');
					}else{
						// alert('ok')
					}
				}else{
					if(this.targetNumbergl == '' || this.targetNamegl == '' || this.targetExplaingl == ''){
						commjs.open(this,'请填写必填项！');
					}else{
						// alert('ok')
					}
				}
			}
		},
		mounted(){
			this.getType();
		},
	}
</script>
<style scoped>
.newTarget {
	position: relative;
	width: 100%;
	background: #FFFFFF;
	border: 1px solid #E9F1F3;
	height: 576px;
	padding: 20px;
	box-sizing: border-box;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 260px;
    margin-left: 5px;
}
.el-input .el-input__inner {
    height: 38px;
}
.name {
	font-size: 14px;
	color: #333333;
}
.inlineblock{
	display: inline-block;
}
.fl{
	float: left;
}
.fr{
	float: right;
}
.el-textarea {
    display: inline-block;
    width: 89%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-select {
    width: 260px;
    display: inline-block;
    position: relative;
}
.xinghao:before {
	content:'*';
	color:red;
}
.bxinghao:before {
	content:'*';
	color: #ffffff;
}
</style>

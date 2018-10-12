<template>
    <section>
        <p class="crumbs"><span @click="goBack">角色权限管理 > </span><span>权限编辑</span></p>
        <section class="system_jurisdiction">
            <div class="bigbox">
                <header>
                    <!-- <el-checkbox-button :indeterminate="this.indeterminate"  @change="handleCheckAll(true)" class="all">全选</el-checkbox-button>
                    <el-checkbox-button :indeterminate="this.indeterminate"  @change="handleCheckAll(false)" class="reset">重置</el-checkbox-button> -->
                    <el-button :indeterminate="this.indeterminate"  @click="handleCheckAll(true)" class="all">全选</el-button>
                    <el-button :indeterminate="this.indeterminate"  @click="handleCheckAll(false)" class="reset">重置</el-button>
                    <span class="rolename">角色名称：
                    <span>{{ roleName }}</span>
                </span>
                </header>
                <div class="checkbox" v-for="(value,index) in this.cities[0]" style="font-size: 16px;font-weight: 800;">
                    <div class="label" style="font-size:16px;font-weight:800">
                        <el-checkbox :indeterminate="value.isIndeterminate" v-model="value.checkAll" @change="handleCheckAlls(value.checkAll,index)" >{{ value.name}}</el-checkbox>
                    </div>
                    <div class="check" v-for="(val,ind) in value.subMenuList">
                        <el-checkbox :indeterminate="val.isIndeterminate" v-model="val.checkAll" @change="handleCheckAllChange(val.checkAll,val.permissionPackageList,val,value)" style="font-size: 15px;">{{ val.name }} </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="val.checkedOption" @change="handleCheckedCitiesChange(val.checkedOption,val.permissionPackageList,val,value)" style="padding-left:20px;">
                            <el-checkbox v-for="(v,i) in val.permissionPackageList"  :label="v.id" :key="i" >{{ v.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="success" @click="preservation">保存</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </footer>
        </section>
    </section>
</template>

<script>
    /**
     * @author ...
     * @date 2018/8/7
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    import { pageInfos, checkboxs } from "@/api/system/jurisdiction";

    export default {
        name: "jurisdiction",
        data() {
            return {
                roleName: "",
                cities: [],
                indeterminate:true,
                checkAll:false,
                id: "",
                pageList: {},
                checkId: []
            };
        },
        methods: {
            goBack(){
                window.history.go(-1);
            },
            // 一级菜单全选
            handleCheckAlls(items,index){
                this.cities[0][index].subMenuList.forEach(item => {
                    this.handleCheckAllChange(items, item.permissionPackageList,item,this.cities[0][index]);
                });
                this.cities[0][index].isIndeterminate = false;
            },
            //二级菜单全选
            handleCheckAllChange(val, option,item,value) {
                item.checkAll = val;
                let arr = [];
                option.forEach((item)=>{
                    arr.push(item.id)
                })
                item.checkedOption = val ? arr : [];
                item.isIndeterminate = false;
                console.log(item.checkedOption,0)
                this.active(value);
            },
            //子项选中
            handleCheckedCitiesChange(val, option, item,value) {
                item.isIndeterminate = false;
                let checkedCount = val.length;
                item.checkAll = checkedCount === option.length;
                item.isIndeterminate =
                    checkedCount > 0 && checkedCount < option.length;
                this.active(value);

            },
            //全部全选/重置
            handleCheckAll(viewData) {
                console.log(111)
                console.log(viewData,"12222")
                var _this = this;
                this.cities[0].forEach((item,index) => {
                    _this.handleCheckAlls(viewData,index);
                });
            },
            // 小组状态
            active(value){
                var kai = false;
                var ab = 0;
                value.subMenuList.forEach((item,index)=>{
                    if(!item.checkAll){
                        kai = true;
                    }
                    if(item.checkedOption.length==0){
                        ab++;
                    }
                });
                if(kai){
                    value.isIndeterminate = true;
                    value.checkAll = false;
                }else{
                    value.isIndeterminate = false;
                    value.checkAll = true;
                }
                if(ab == value.subMenuList.length){

                    value.isIndeterminate = false;
                    value.checkAll = false;
                }
            },
            pageInfo() {
                let data = {
                    id:this.id
                }
                pageInfos(data).then(res =>{
                    //console.log(res.data.data)
                    var pageList = res.data.data;
                    this.roleName = pageList.name;
                    this.cities.push(pageList.menu)

                }).catch(error => {
                    console.log(error + '错误')
                })
            },
            preservation() {
                for(var i =0;i<this.cities[0].length;i++){
                    var subMenuList = this.cities[0][i].subMenuList
                    for(var j=0;j<subMenuList.length;j++){
                        if(subMenuList[j].checkedOption.length>0){
                            this.checkId.push(subMenuList[j].checkedOption)
                        }
                    }
                }
                var checkId = this.checkId.toString()
                let data = {
                    id:this.id,
                    permiss:checkId
                }
                checkboxs(data).then(res => {
                    this.$router.push({
                        path: "/system/permission/"
                    });
                }).catch(error => {
                    console.log(error + '错误')
                })
            },
            cancel() {
                this.$router.push({
                    path: "/system/permission/"
                });
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            this.pageInfo();
        }
    };
</script>


<style rel="stylesheet/scss" lang="scss">
    @import "@/styles/permission/jurisdiction.scss";
</style>

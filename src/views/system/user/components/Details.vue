<template>
    <section class="simpletable">
        <el-table
            :header-cell-style="getRowClass"
            :data="tableData"
            stripe
            v-if="tableData">
            <!--<el-table-column-->
            <!--v-for="(item,index) in tableHeade"-->
            <!--:key="index"-->
            <!--:prop="item.types"-->
            <!--:label="item.name"-->
            <!--:width="item.fixed?90:150">-->
            <!--<template v-if="item.children" slot-scope="scope">-->
            <!--<span class="operation" v-for="(v,i) in item.children" :key="i" :class="v.styles">{{v.name}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->


            <el-table-column fixed prop="realname" label="姓名" width="120px" :formatter="formatRealname">
            </el-table-column>
            <el-table-column fixed prop="username" label="工号" width="100px">
            </el-table-column>
            <el-table-column  prop="email" label="邮箱" :formatter="formatEmail" width="230px">
            </el-table-column>
            <el-table-column  prop="phone" label="电话" width="120px">
            </el-table-column>
            <el-table-column  prop="genderName" label="性别">
            </el-table-column>
            <el-table-column  prop="statusName" label="状态">
            </el-table-column>
            <el-table-column  prop="outDate" label="离职日期" :formatter="formatoutDate" width="110px">
            </el-table-column>
            <el-table-column  prop="statusType" label="离职类型" width="100px">
            </el-table-column>
            <el-table-column  prop="resignationName" label="离职原因">
            </el-table-column>
            <el-table-column  prop="schedulingName" label="排班状态">
            </el-table-column>
            <el-table-column  prop="natureName" label="是否实习生" width="100px">
            </el-table-column>
            <el-table-column  prop="entryTime" label="入职日期" :formatter="formatentryTime" width="110px">
            </el-table-column>
            <el-table-column  prop="birthday" label="生日" :formatter="formatbirthday" width="110px">
            </el-table-column>

            <el-table-column  prop="entry" label="项目" width="160px">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.entry }}</p>
                        <div slot="reference">
                            <el-tag size="medium">{{ scope.row.entry }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column  prop="group" label="小组" width="160px">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.group }}</p>
                        <div slot="reference">
                            <el-tag size="medium">{{ scope.row.group }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column  prop="roleName" label="角色" width="160px">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.roleName }}</p>
                        <div slot="reference">
                            <el-tag size="medium">{{ scope.row.roleName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column  prop="officeLocation" label="办公地点" :formatter="formatTypes" width="100px">
            </el-table-column>

            <el-table-column fixed="right" label="操作"  width="186">
                <template slot-scope="scope">
                    <span class="operation details" @click="detailsAndEdit('1',scope.row)">详情</span>
                    <div class="dimissionbox" v-if="scope.row.outDate==null">
                        <span class="operation compile" @click="detailsAndEdit('0',scope.row)" v-if="BtnPermission.includes('编辑用户')">编辑</span>
                        <div class="dimissionbox"  v-if="BtnPermission.includes('离职')">
                            <span class="operation dimission" @click="handleDimission(scope.row)" v-if="isDimission(scope.row)">离职</span>
                            <span class="operation dimission" style="color:#aaa;cursor:default;" v-else>离职</span>
                        </div>
                        <div class="dimissionbox" v-if="filterRole(scope.row,BtnPermission.includes('调出'))">
                            <span class="operation export" @click="handleExport(scope.row)" v-if="isDimission(scope.row)">调出</span>
                            <span class="operation export" style="color:#aaa;cursor:default;" v-else>调出</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!--离职弹层-->
        <el-dialog title="离职人员" :visible.sync="dialogFormVisible" width="500px" :lock-scroll="false" @close='closeDialog'>
            <Dimission :userId="userId" :entryTime="entryTime" @closes="closeDimission" :dialogState="dialogState"></Dimission>
        </el-dialog>

        <!--调出弹层-->
        <el-dialog title="人员调出" :visible.sync="dialogVisible" width="500px" :lock-scroll="false" class="exports" @close='closeDialog'>
            <Transfer :userId="userId" @closes="closeTransfer" :formData="formData" :dialogState="dialogState"></Transfer>
        </el-dialog>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [用户管理] 页面详情
     * @module 组件引用位置
     */

    import Dimission from './Dimission'
    import Transfer from './Transfer'
    import TempCache from "../../../../utils/tempcache";

    export default {
        props: ['tableData','BtnPermission'],
        components:{
            Dimission,
            Transfer
        },
        data() {
            return {
                userId:'',   //用户ID离职、调出需要传递
                entryTime:'',
                dialogFormVisible: false,
                dialogVisible:false,
                tableHeade:[
                    {name:'姓名', types:'realname', fixed:true},
                    {name:'工号', types:'username', fixed:true},
                    {name:'邮箱', types:'email', fixed:false},
                    {name:'电话', types:'phone', fixed:false},
                    {name:'性别', types:'genderName', fixed:false},
                    {name:'状态', types:'statusName', fixed:false},
                    {name:'离职类型', types:'statusType', fixed:false},
                    {name:'离职原因', types:'resignationName', fixed:false},
                    {name:'排班状态', types:'schedulingName', fixed:false},
                    {name:'是否实习生', types:'natureName', fixed:false},
                    {name:'入职日期', types:'entryTime', fixed:false},
                    {name:'生日', types:'birthday', fixed:false},
                    {name:'项目', types:'entry', fixed:false},
                    {name:'小组', types:'group', fixed:false},
                    {name:'角色', types:'roleName', fixed:false},
                    {name:'办公地点', types:'officeLocation', fixed:false},
                    {name:'操作', types:'', fixed:true, children:[
                            {name:'详情', styles:'details'},
                            {name:'编辑', styles:'compile'},
                            {name:'离职', styles:'dimission'},
                            {name:'调出', styles:'export'},
                        ]
                    }
                ],
                formData:'',
                newRole: ['管理员','PM','PM助理','主管','主管助理'],
                dialogState:false
            }
        },
        methods:{
            isDimission(value){
                if((value.up == '2' && value.down == '2') || (value.up == '1' &&  value.down == '2')){
                    return false
                }else{
                    return true
                }
            },
            closeDialog(){
                this.dialogState = true
            },
            filterRole(v,flag){
                let str = true;
                if(flag){
                    if(v.roleName){
                        let newV = v.roleName.split(',');
                        for(let i = 0; i < newV.length; i++) {
                            for(let j = 0; j < this.newRole.length; j++) {
                                if(newV[i]==this.newRole[j]){
                                    str = false;
                                    break;
                                }
                            }
                        }
                    }
                }else{
                    str = false;
                }
                return str;
            },
            closeTransfer(val){
                if(val=='success'){
                    this.$emit('restData');
                }
                this.dialogVisible = false;
            },
            closeDimission(val){
                if(val=='success'){
                    this.$emit('restData');
                }
                this.dialogFormVisible = false;
            },
            // filterState(v){
                // if(v.roleName){
                //     let newV = v.roleName.split(',');
                //     if(newV.includes('管理员')){
                //         return false
                //     }else{
                //         return true
                //     }
                // }
            // },
            //离职弹框
            handleDimission(data) {
                this.dialogFormVisible = true;
                this.dialogState = false;
                this.userId = data.id;
                this.entryTime = data.entryTime;
            },
            //调出弹框
            handleExport(data){
                this.userId = data.id;
                this.formData = data;
                this.dialogState = false;
                this.dialogVisible = true;
            },
            //表头颜色置灰,字变白
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return {background:'#92A6B1',color:'#fff'}
                } else {
                    return ''
                }
            },
            //过滤入职日期
            formatentryTime(row){
                return row.entryTime.substr(0,10);
            },
            formatoutDate(row){
                if(row.outDate){
                    return row.outDate.substr(0,10);
                }
            },
            //姓名
            formatRealname(row){
                if(row.realname){
                    if(row.realname.length>10){
                        return row.realname.substr(0,10)+'...';
                    }else{
                        return row.realname;
                    }
                }else{
                    return row.realname;
                }
            },
            //过滤生日
            formatbirthday(row){
                return row.birthday.substr(0,10);
            },
            //过滤邮箱
            formatEmail(row){
                if(row.email){
                    if(row.email.length>25){
                        return row.email.substr(0,25)+'...';
                    }else{
                        return row.email
                    }
                }
            },
            //项目
            formatProject(row){
                if(row.entry){
                    if(row.entry.length>10){
                        return row.entry.substr(0,10)+'...';
                    }else{
                        return row.entry;
                    }
                }else{
                    return row.entry;
                }
            },
            formatRoleName(row){
                if(row.roleName){
                    if(row.roleName.length>10){
                        return row.roleName.substr(0,10)+'...';
                    }else{
                        return row.roleName;
                    }
                }else{
                    return row.roleName;
                }
            },
            //小组
            formatGroup(row){
                if(row.group){
                    if(row.group.length>10){
                        return row.group.substr(0,10)+'...';
                    }else{
                        return row.group;
                    }
                }else{
                    return row.group;
                }
            },
            //过滤办公地点(请选择时为空)
            formatTypes(row){
                if(row.officeLocation=='请选择'){
                    return row.officeLocation = '';
                }else{
                    return row.officeLocation;
                }
            },
            detailsAndEdit(flag,val){
                if(flag==1){
                    this.$router.push({path:`/system/view/${val.id}`})
                }else{
                    this.$router.push({path:`/system/edit/${val.id}`})
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .simpletable{
        .el-table{
            .el-table__body{
                .el-table__row{
                    .dimissionbox{
                        display: inline-block;
                    }
                    .operation{
                        margin-right:10px;
                        cursor:pointer;
                    }
                    .details,.compile{
                        color:#11A0F8;
                    }
                    .dimission{
                        color:#FE7575;
                    }
                    .export{
                        color:#E3AF22;
                    }
                }
            }
        }
        .el-dialog__body{
            padding-bottom: 0;
            .el-form{
                margin:0 auto;
                width:265px;
                .el-form-item{
                    width:265px;
                    text-align: left;
                    .el-form-item__label{
                        width:56px;
                        font-size:14px;
                        padding:0px;
                        margin-right:9px;
                    }
                    .el-form-item__content{
                        width:275px;
                        padding-bottom: 20px;
                        .el-input{
                            width:200px;
                        }
                        .el-input__prefix{
                            left:172px;

                        }
                        .el-input__inner{
                            padding-left:15px;
                        }
                        .el-input__suffix{
                            /*display: none;*/
                            .el-icon-circle-close{
                                display: none;
                            }
                        }
                        .el-textarea{
                            width:200px;
                        }
                    }
                }
            }
        }
        .dimission{
            /*错误提示样式*/
            .el-form{
                .el-form-item__content{
                    .el-form-item__error{
                        top:65%;
                        left:66px;
                    }
                }
            }
        }
        .exports{
            .el-dialog__body{
                .el-form{
                    .el-form-item{
                        .el-form-item__content{
                            .el-form-item__error{
                                top:60%;
                                left:10px;
                            }
                        }
                    }
                    .textarea{
                        .el-form-item__content{
                            .el-textarea{
                                .el-textarea__inner{
                                    resize: none;
                                }
                            }
                            .el-form-item__error{
                                top:80%;
                                left:10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

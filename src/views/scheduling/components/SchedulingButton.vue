<template>
	<header class="header">
		<el-button size="small" type="primary" class="btn_Import" id="button" @click="centerDialogVisible = true" style="background-color:#00C4AB;border-color:#00C4AB">
			<svg-icon icon-class="import" id="svg-icon" style="margin-right: 2.4px;" />
			<span>导入</span>
		</el-button>
		<!--导入上传1级弹框-->
		<el-dialog title="导入" :visible.sync="centerDialogVisible" width="30%" :lock-scroll="false">
			<section class="uploadContent">
				<div class="uploadContent-select">
					<span>选取文件：</span>
				</div>
				<p>文件格式为.xsl或.xlsx,大小不超过5M！</p>
				<div class="uploadContent-btn">
					<el-button type="success" @click="submitUpload">导入</el-button>
					<el-button type="info" @click="centerDialogVisible = false">取消</el-button>
				</div>

			</section>
			<el-upload class="upload-excel" ref="upload" :action="uploadUrl()" :file-list="fileList" :auto-upload="false" :on-success="uploadSuccess" :on-error="uploadError" :beforeUpload="beforeAvatarUpload" :on-change="handleChange">
				<el-button slot="trigger" class="selectFile">
					<svg-icon icon-class="select" style="width:15px;height:15px;vertical-align: -.1em;margin-top: -20px;" />
					<span>选取文件</span>
				</el-button>
			</el-upload>
		</el-dialog>
		<el-dialog :title="title" :visible.sync="listDialogVisible" :lock-scroll="false">
			<div class="error">
				<div class="title">
					<svg-icon icon-class="importerror" class="face" />
					<div class="info">
						<h3>导入失败！</h3>
						<p>已导入0条数据，失败原因如下，请修改模板数据</p>
					</div>
				</div>
				<template>
					<el-table :data="errorData"  stripe style="width: 100%" :header-cell-style="getRowClass">
						<el-table-column type="index" label="序号" width="50" >
						</el-table-column>
						<el-table-column prop="excelRow" label="EXCEL行" width="80">
						</el-table-column>
						<el-table-column prop="userName" label="工号" width="90">
						</el-table-column>
						<el-table-column prop="realName" label="真实姓名" width="100" >
						</el-table-column>
						<el-table-column prop="failReason" label="失败原因">
						</el-table-column>
					</el-table>
				</template>
            </div>
        </el-dialog>
		<el-button size="small" type="primary" class="btn_download" id="button" @click="downloadBtn" style="background:#4A90E2">
			<svg-icon icon-class="download" id="svg-icon" style="margin-right: 2.4px;"/>
			<span>下载</span>
		</el-button>
	</header>
</template>

<script>
/**
 * @author Shumei Zhao
 * @date 2018/8/23
 * @desc [排班管理] 页面按钮 \src\views\scheduling\SchedulingManage
 * @module 组件引用位置
 */

import { dowloadShifts } from "@/api/scheduling/schedulingManage";
import comm from "@/utils/comm";
import { mapActions } from "vuex"
export default {
    inject:['reload'],//刷新页面依赖
    name: "arrangeButton",
    data() {
        return {
            fileList: [], //导入数据
            centerDialogVisible: false, //导入弹框
            listDialogVisible: false, //导入失败返回数据展示
            // errorDatas: "错误", //导入错误返回数据展示
            title: "",
            errorData: [],//错误数据
        };
    },
    methods: {
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return { background: "#92A6B1", color: "#ffffff" };
            } else {
                return "";
            }
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        beforeAvatarUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                comm.warnRemid(this, "上传文件不能大于5M");
                return false;
            }
            let reg = /.xlsx|.xls/;
            if (!reg.test(file.name)) {
                comm.warnRemid(this, "请导入正确的模板");
                return false;
            }
        },
        //导入成功回调
        uploadSuccess(res) {
            // console.log(res.data)
            // if(res && res.data) {
            // console.log(res.data)
            if (res.data != "") {
                this.errorData = res.data;
                this.centerDialogVisible = false;
                this.title = "错误";
                setTimeout(() => {
                    this.listDialogVisible = true;
                }, 500);
                // console.log("导入回调有失败");
            } else {
                comm.successRemid(this, "导入成功");
                setTimeout(() => {
                    this.centerDialogVisible = false;
                }, 500);
                this.setScheduling(true)
                this.reload()
                location.reload()//关闭弹窗后刷新页面
                console.log("此处已添加刷新刷新刷新刷新！！！！！")
            }
            // }
        },
        //导入失败回调
        uploadError(err) {
            // console.log("导入失败，请查看网络");
        },
        //导入请求地址
        uploadUrl() {
            let url =
                process.env.BASE_API +
                "/admin/bpoShiftsUser/importShiftsUserExcel";
            return url;
        },
        //导入上传
        submitUpload() {
            this.$refs.upload.submit();
            // console.log("导入");
        },
        // 下载
        downloadBtn() {
            dowloadShifts({})
                .then(res => {
                    if (res) {
                        const blob = new Blob([res.data], {
                            type:
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        const downloadElement = document.createElement("a");
                        const href = window.URL.createObjectURL(blob);
                        downloadElement.href = href;
                        downloadElement.download = "IDSC班表模板.xlsx";
                        document.body.appendChild(downloadElement);
                        downloadElement.click();
                        document.body.removeChild(downloadElement); // 下载完成移除元素
                        window.URL.revokeObjectURL(href); // 释放掉blob对象
                    }
                })
                .catch(error => {
                    // console.log(error, 222);
                });

        },
        ...mapActions(['setScheduling'])
    },
    watch: {
        centerDialogVisible() {
            if (!this.centerDialogVisible) {
                this.fileList = [];
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.uploadContent {
    margin-left: 60px;
    .uploadContent-select {
        .el-button {
            margin-left: 30px;
        }
        margin-bottom: 38px;
    }
    .uploadContent-info {
        color: #666;
        p {
            line-height: 20px;
        }
        span {
            color: #11a0f8;
            cursor: pointer;
        }
    }
    .uploadContent-btn {
        margin: 20px 15px;
        .el-button {
            margin: 0 15px;
        }
    }
}
.error {
	line-height: 30px;
	.title{
            vertical-align: middle;
            margin:8px 0 35px 220px;
            .face{
                color:#11A0F8;
                width:34px;
                height:34px;
            }
            .info{
                margin-left:6px;
                display: inline-block;
                p{
                    line-height: 10px;
                }
            }
        }
}
.upload-excel {
    .el-button {
        position: absolute;
        left: 150px;
        right: 0;
        top: 70px;
        // .selectFile .el-button--default>span{
        //     margin-top: -20px;
        //     display: inline-block;
        // }
    }
}

</style>

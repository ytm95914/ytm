<template>
	<div class="noline_data">
		<div class="noneStyle">
			<img src="../../assets/none_data.png" alt="" />
		</div>
		<div>
			暂无数据 !
		</div>
	</div>
</template>

<script>
    export default{
        name: "NoData",
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.noline_data {
		width: 100%;
		height: 440px;
		text-align: center;
		padding-top: 130px;
		box-sizing: border-box;
        color:rgb(96, 98, 102);
		.noneStyle {
			width: 196px;
			height: 112px;
			margin: 0 auto;
			margin-bottom: 15px;
		}
	}
</style>

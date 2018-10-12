<template>
    <section class="al-middleTipsBox">
        <section class="al-middleTipsModal ev-loading">
            <figure class="al-middleTipsModalText al-loading">
                <img src="@/assets/loading.gif" alt="">
            </figure>
        </section>
    </section>
</template>

<script>
   export default{

   };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .al-middleTipsBox{
        position: fixed;
        top:50%;
        left: 50%;
        margin-left: -100px;
        margin-top: -100px;
        z-index: 18;
        .al-middleTipsModal .al-loading img {
            width:200px;
            height: 200px;
            /*animation: rotate 1s linear infinite;*/
            /*-webkit-animation: rotate 1s linear infinite;*/
        }
    }

</style>

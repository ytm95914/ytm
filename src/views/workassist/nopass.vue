<template>
    <section class="nopass">
      <nopassHeader/>
      <nopassTable/>
    </section>
</template>
<script>
   /**
     * @author Tianming Yu
     * @date 2018/8/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

import nopassHeader from './components/nopassHeader'
import nopassTable from './components/nopassTable'
export default {
  name:"nopass",
  components: {
    nopassHeader,
    nopassTable
  }, 
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "@/styles/workassist/nopass.scss";
</style>
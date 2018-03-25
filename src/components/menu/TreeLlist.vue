<template>
  <div>
    <div class="nav">
       <Button class="pull-right" @click="addAction">新增</Button>
    </div>
    <Table ref="selection" :columns="columns" :data="data"></Table>
    <div class="i-btn-group">
      <Button @click="batchDeleteAction">批量删除</Button>
      <Button @click="batchSaveSortAction">保存排序</Button>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      columns:Array,
      data: Array
    },
    methods: {
      batchDeleteAction () {
        this.$emit('batch','delete',this.$refs.selection)
      },
      batchSaveSortAction () {
        this.$emit('batch','saveSort',this.$refs.selection)
      },
      addAction(){
        this.$emit('add')
      }
    }
  }
</script>

<style lang="less" scoped>
  .nav {
    padding-bottom: 24px;
  }
  .i-btn-group{
    padding-top: 24px;
  }
</style>


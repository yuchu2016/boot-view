<template>
  <Tree :data="data" @on-select-change="onSelectChange" ></Tree>
</template>
<script>
  export default {
    props: {
      data: Array
    },
    methods: {
      onSelectChange (d) {
        let id = d.length>0?d[0].id:-1;
        console.log(d)
        this.$emit('click',id)
      }
    }
  }
</script>

<style>
  .ivu-tree-title{
    font-size: 15px;
  }
</style>

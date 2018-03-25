<template>
    <div class="box">
      <div class="box-header">
        <slot name="header">
        </slot>
      </div>
      <div class="box-body">
        <slot></slot>
      </div>
    </div>
</template>

<style lang="less" scoped>
  .box{
    background: #fff;
    border: 1px solid #d4dde2;
    margin-bottom: 18px;
    &-header{
      padding: 0 18px;
      font-size: 14px;
      color: #565656;
      background: #eceff1;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      border-bottom: 1px solid #d4dde2;
    }
    &-body{
    }
  }

</style>

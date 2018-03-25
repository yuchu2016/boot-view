<template>
  <ul class="main-menu">
    <template v-for="menu in menus">
      <li v-if="menu.children==null">
        <a v-if='menu.isOpenTab' class="waves-effect" href="javascript:;" @click="open_tab(menu)"><i
          class="zmdi" :class="menu.icon"></i> {{menu.name}}</a>
        <a v-else='' class="waves-effect" :href="menu.path"><i class="zmdi" :class="menu.icon"></i>
          {{menu.name}}</a>
      </li>
      <li v-else class="sub-menu  system_menus ">
        <a class="waves-effect" href="javascript:;"><i class="zmdi" :class="menu.icon"></i>
          {{menu.name}}</a>
        <!--菜单-->
        <ul>
          <li v-for="m in menu.children">
            <a v-if='m.isOpenTab' class="waves-effect" href="javascript:;" v-on:click="open_tab(m)"><i
              class="zmdi" :class="m.icon"></i> {{m.name}}</a>
            <a v-else='' class="waves-effect" :href="m.path" ><i class="zmdi" :class="m.icon"></i>
              {{m.name}}</a>
          </li>
        </ul>
      </li>
    </template>
    <slot></slot>
  </ul>
</template>

<script>
  /*<MenuBar :menus="menus" :open_tab="open_tab">
    <li class="kiwi-version">
    &copy; {{version}}
  </li>
  </MenuBar>*/
  export default {
    props:{
      menus:[Array]
    },
    methods: {
      //将事件提交给父组件
      open_tab: function (menu) {
        this.$emit('open_tab', menu);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

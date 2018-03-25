<template>
  <section id="main">
    <aside id="sidebar" class="sidebar c-overflow">
      <div class="profile-menu">
        <a href="">
          <div class="profile-pic">
            <img :src="user.avatar" alt="">
          </div>

          <div class="profile-info">
            {{user.username}}
            <i class="zmdi zmdi-caret-down"></i>
          </div>
        </a>
        <!--用户菜单-->
        <MenuBar :menus="user_menus" @open_tab="open_tab"></MenuBar>
      </div>
      <!--系统菜单-->
      <MenuBar :menus="menus" @open_tab="open_tab">
        <li class="kiwi-version">
          <br>
          &copy; {{version}}
        </li>
      </MenuBar>
    </aside>
    <!--侧边栏-->
    <aside id="chat" class="sidebar c-overflow">

      <div class="chat-search">
        <div class="fg-line">
          <input type="text" class="form-control" placeholder="Search People">
        </div>
      </div>
      <!--消息中心-->
      <div class="listview">
        <slot name="list_view"></slot>
      </div>
    </aside>


    <section id="content">
      <div class="container">
        <div class="block-header">
          <h2 v-text="menu_title">Colors</h2>
        </div>

        <div class="card">
          <slot></slot>
        </div>

      </div>
    </section>
  </section>
</template>

<script>
//  <Main :user="user" :user_menus="user_menus" :menus="menus" :menu_title="menu_title" @open_tab="open_tab"></Main>
  import MenuBar from './MenuBar.vue'

  export default {
    props: {
      user: [Object],
      user_menus: [Array],
      menus: [Array],
      menu_title:String
    },
    data() {
      return {
        version: 'SJ-boot 1.0.1',
      }
    },
    components: {
      MenuBar
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
  .kiwi-version {
    text-align: center;
  }
</style>

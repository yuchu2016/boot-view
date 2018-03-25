<template>
  <div id="kiwi-admin">
    <iHeader :current_system="current_system" :system_list="system_list" :user_menus="user_menus"
             @click_sys_switch="sys_switch" @click_search="search"></iHeader>
    <iMain :user="user" :user_menus="user_menus" :menus="menus" :menu_title="menu_title" @open_tab="open_tab">
      <slot></slot>
    </iMain>
    <iFooter></iFooter>
    <template v-if="showPageLoader">
      <PageLoader></PageLoader>
    </template>

  </div>
</template>

<script>
  var log = ()=>{}//console.log;
  import Header from './Header.vue'
  import Main from './Main.vue'
  import Footer from './Footer.vue'
  import PageLoader from './PageLoader.vue'

  export default {

    props: {
      current_system: Object,
      system_list: Array,
      user: Object,
      user_menus: Array,
      menus: Array,
      menu_title: String
    },
    methods: {
      sys_switch(sys) {
        this.$emit('click_sys_switch', sys)
        log(sys);
      },
      search(q) {
        this.$emit('click_search', q)
        log(q);
      },
      //将事件提交给父组件
      open_tab: function (menu) {
        this.$emit('open_tab', menu)
        log(menu);
      }
    },
    components: {
      iHeader: Header,
      iMain: Main,
      iFooter: Footer,
      PageLoader
    },
    data() {
      return {
        showPageLoader: true
      }
    },
    created() {
      setTimeout(() => {
        this.showPageLoader = false;
      }, 1000)
    },

  }
</script>

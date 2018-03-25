<template>
  <header id="header" class="clearfix" :data-current-skin="l_current_system.skin">
    <ul class="header-inner">
      <li id="menu-trigger" data-trigger="#sidebar">
        <div class="line-wrap">
          <div class="line top"></div>
          <div class="line center"></div>
          <div class="line bottom"></div>
        </div>
      </li>

      <li class="logo hidden-xs">
        <a href="/#" v-text="">
          <img src="static/img/logo.png"/>&nbsp;&nbsp;{{l_current_system.name}}</a>
      </li>

      <li class="pull-right">
        <ul class="top-menu">
          <li id="toggle-width">
            <div class="toggle-switch">
              <input id="tw-switch" type="checkbox" hidden="hidden" >
              <label for="tw-switch" class="ts-helper"></label>
            </div>
          </li>

          <li id="top-search">
            <a href=""><i class="tm-icon zmdi zmdi-search"></i></a>
          </li>


          <li class="dropdown">
            <a class="waves-effect waves-light" data-toggle="dropdown">
              <i class="tm-icon zmdi zmdi-dropbox"></i>
            </a>
            <!--请选择系统切换-->
            <ul class="dropdown-menu dm-icon pull-right">
              <li class="skin-switch">
                请选择系统切换
              </li>
              <li class="divider"></li>
              <li v-for="sys in system_list" @click="sys_switch(sys)">
                <a class="waves-effect switch-systems" href="javascript:;"><i class="zmdi" :class="sys.icon"></i>
                  {{sys.name}}
                </a>
              </li>
            </ul>
          </li>

          <li class="dropdown">
            <a data-toggle="dropdown" href=""><i class="tm-icon zmdi zmdi-more-vert"></i></a>
            <ul class="dropdown-menu dm-icon pull-right">

              <li>
                <a data-action="fullscreen" ><i class="zmdi zmdi-fullscreen"></i> 切换全屏</a>
              </li>
              <li>
                <a data-action="clear-localstorage" href="javascript:;"><i class="zmdi zmdi-delete"></i> 清除缓存</a>
              </li>
              <li>
                <a  href="/#/logout"><i class="zmdi zmdi-run"></i> 退出登录</a>
              </li>

            </ul>
          </li>
<!--          <li class="hidden-xs" id="chat-trigger" data-trigger="#chat">
            <a href=""><i class="tm-icon zmdi zmdi-comment-alt-text"></i></a>
          </li>-->
        </ul>
      </li>
    </ul>

    <!-- Top Search Content -->
    <div id="top-search-wrap">
      <div class="tsw-inner">
        <i id="top-search-close" class="zmdi zmdi-arrow-left"></i>
        <input type="text" v-model="search_text" @keyup.enter="search">
      </div>
    </div>
  </header>

</template>

<script>
//  <Header :current_system="current_system" :system_list="system_list" :user_menus="user_menus" @click_sys_switch="sys_switch" @click_search="search"></Header>
  export default {
    props: {
      current_system:[Object],
      system_list: [Array]
    },
    created(){
      this.l_current_system=this.current_system;
    },
    data() {
      return {
        search_text: '',
        l_current_system:undefined
      };
    },
    methods: {
      //将事件提交给父组件
      sys_switch: function (sys) {
        this.l_current_system = sys;
        this.$emit('click_sys_switch', sys)
      },
      search: function () {
        this.$emit('click_search', this.search_text)
      }
    },
    watch:{
      current_system(val){
        this.l_current_system=val;
      }
    }
  }
</script>

<style lang="less" scoped>
  .dropdown-menu{
    border-radius: 4px;
  }
  /*深藍*/
  .skin-dark-blue,[data-current-skin="skin-dark-blue"],.bgm-skin-dark-blue {
    background-color: #455ec5 !important;
  }
  /*藍色*/
  .skin-blue,[data-current-skin="skin-blue"],.bgm-skin-blue {
    background-color: #0B8DE5 !important;
  }
  /*綠色*/
  .skin-green,[data-current-skin="skin-green"],.bgm-skin-green {
    background-color: #29A176 !important;
  }
  /*粉紅*/
  .skin-pink,[data-current-skin="skin-pink"],.bgm-skin-pink {
    background-color: #F06292 !important;
  }
  /*紫色*/
  .skin-purple,[data-current-skin="skin-purple"],.bgm-skin-purple {
    background-color: #6539B4 !important;
  }
</style>

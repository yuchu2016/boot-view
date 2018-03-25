<template>

  <Index :current_system="current_system" :system_list="system_list" :user="user" :user_menus="user_menus"
         :menus="menus" :menu_title="bus.state.menu_title"
         @click_sys_switch="sys_switch" @click_search="search" @open_tab="open_tab">
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </Index>
</template>

<script>
  import Index from '../components/admin/Index.vue'
  import bus from '../bus'
  import {listMenu, getMenusBySys, getUserName} from '../api/IndexApi'

  let log = (a)=>{};
  export default {
    name: 'Admin',
    data() {
      return {
        current_system: {id: '1', skin: 'skin-green', name: '权限管理系统', icon: 'zmdi-shield-security'},
        //system_list.name对应主题名称
        system_list: [
          {id: '1', skin: 'skin-green', name: '权限管理系统', icon: 'zmdi-shield-security'},
        ],
        //main
        user: {
          username: 'kiwi',
          avatar: '/static/img/profile-pics/4.jpg',
          bg: ''
        },
        user_menus: [
          {name: '个人资料', icon: 'zmdi-account', path: '/edit/user?=', isOpenTab: true},
          // {name: '隐私管理', icon: 'zmdi-face', path: '', isOpenTab: true},
          // {name: '其他设置', icon: 'zmdi-settings', path: '', isOpenTab: true},
          {name: '退出登录', icon: 'zmdi-run', path: 'logout', isOpenTab: true}
        ],
        menus: [
          // {name: '首页', icon: 'zmdi-home', path: '/', isOpenTab: true},
          // {
          //   name: 'demo', icon: 'zmdi-coffee', children: [
          //   {name: 'table', icon: '', path: '/demo', isOpenTab: true},
          //   {name: 'icon', icon: '', path: '/icon', isOpenTab: true}
          // ]
          // }
        ],
        bus
      };
    },
    mounted() {
      listMenu((res) => {
        log(res)
        this.system_list = res.system_list;
        this.current_system = res.current_system;
        this.menus = res.menus;
      })
      getUserName((username) => {
        this.user.username = username;
        this.welcome();
      })

    },
    components: {
      Index
    },
    methods: {
      sys_switch(sys) {
        getMenusBySys(sys.id, (res) => {
          this.menus = res;
        })
      },
      search(q) {
        log(q);
      },
      //将事件提交给父组件
      open_tab: function (menu) {
        if (menu.path.indexOf("http://") > -1) {
          location.href = menu.path;
        } else {
          this.$router.push(menu.path)
        }

      },
      welcome() {
        this.$Notice.open({
          title: '欢迎您',
          desc: '欢迎' + this.user.username + '登录'
        });
      }
    },
    watch:{
      menus(menus){
        let permissions = [];
        for(let m of menus){
          if(m.children){
            for(let m1 of m.children){
              permissions.push(m1.permission)
            }
          }
        }
        bus.state.permissions=permissions;
      }
    }
  }
</script>

<style lang="less">
  body {
    background-color: #edecec;
  }

  #header .logo a:hover {
    color: #fff;
  }

  .c-overflow::-webkit-scrollbar
  {
    width: 3px;
    height: 16px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
    border-radius: 3px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
    background-color: #555;
  }
</style>

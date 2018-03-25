<template>
  <div>
    <Box>
      <div slot="header">系统菜单列表</div>
      <div class="card-body card-padding module">
        <menu-tree :data="data" @click="treeClick" class="tree"></menu-tree>
        <div class="tree-list">
          <menu-list :columns="columns" :data="listData" @add="modal10 = true"></menu-list>
        </div>
      </div>
    </Box>
    <Modal
      v-model="modal10"
      :closable="false"
      class-name="vertical-center-modal">
      <Tabs  v-model="tabIndex">
        <TabPane label="系统" icon="ios-monitor">
          <Form :model="formItem" :label-width="60">
            <FormItem label="名称">
              <Input v-model="formItem.name" placeholder="请输入名称..."></Input>
            </FormItem>
            <FormItem label="图标">
              <Input v-model="formItem.icon" placeholder="请输入图标..."></Input>
            </FormItem>
            <FormItem label="皮肤">
              <RadioGroup v-model="formItem.radio">
                <Radio label="green">绿</Radio>
                <Radio label="1">深蓝</Radio>
                <Radio label="2">粉紅</Radio>
                <Radio label="3">紫</Radio>
                <Radio label="blue">蓝</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="目录" icon="ios-albums">
          <Form :model="formItem" :label-width="60">
            <FormItem label="上级菜单">
              <Cascader :data="data2" v-model="formItem.parentList"></Cascader>
            </FormItem>
            <FormItem label="名称">
              <Input v-model="formItem.name" placeholder="请输入名称..."></Input>
            </FormItem>
            <FormItem label="图标">
              <Input v-model="formItem.icon" placeholder="请输入图标..."></Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="菜单" icon="android-menu">
          <Form :model="formItem" :label-width="60">
            <FormItem label="上级菜单">
              <Cascader :data="data2" v-model="formItem.parentList"></Cascader>
            </FormItem>
            <FormItem label="名称">
              <Input v-model="formItem.name" placeholder="请输入名称..."></Input>
            </FormItem>
            <FormItem label="图标">
              <Input v-model="formItem.icon" placeholder="请输入图标..."></Input>
            </FormItem>
            <FormItem label="路径">
              <Input v-model="formItem.url" placeholder="请输入路径..."></Input>
            </FormItem>
            <FormItem label="权限标识">
              <Input v-model="formItem.permission" placeholder="请输入路径..."></Input>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>

    </Modal>

  </div>

</template>

<script>
  import MenuTree from '../../components/menu/Tree.vue'
  import Box from '../../components/Box.vue'
  import MenuList from '../../components/menu/TreeLlist.vue'
  import {listMenuTree, findByParent, addMenu} from '../../api/sys/MenuApi'
  export default {
    data () {
      return {
        tabIndex: 1,
        formItem: {
          parentList: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
          name: '',
          icon: '',
          url: '',
          radio: '',
          permission: ''
        },
        data2: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }],
        modal10: false,
        data: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name',
            width: 200,
            render: (h, params) => {
              let icon = this.getIcon(params.row.icon)
              return h('span', {
                'class': icon
              },params.row.name)
            }
          },
          {
            title: '路径',
            key: 'url',
            width: 300
          },
          {
            title: '权限标识',
            key: 'permission',
            width: 160
          },
          {
            title: ' '
          },
          {
            title: '排序',
            key: 'sort',
            width: 160,
            render: (h, params) => {
              return h('Input', {
                props: {
                  value: params.row.sort,
                  size: 'small'
                },
                on: {
                  input: (value) => {
                    params.row.sort = value;
                  }
                }
              });
            }
          },
          {
            title: ' '
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ]);
            }
          }
        ],
        listData: []
      }
    },
    components: {
      MenuTree,
      Box,
      MenuList
    },
    mounted () {
      listMenuTree((data) => {this.data = data})
      this.treeClick(1)
    },
    methods: {
      save () {
        let menuObj = this.createMenuObj()
        addMenu(menuObj,(d)=>{},()=>{})
      },
      treeClick (id) {
        if(id>0){
          findByParent(id, data => {
            this.listData = data
          },()=>{})
        }
      },
      getIcon (iconStr) {
        let getIconStr = (str) => {
          if(str.indexOf("  ")>-1){
            return getIcon(str.replace("  ", " "))
          } else {
            return str
          }
        }
        let iconDataArray = getIconStr(iconStr).split(" ")
        let icon = {}
        iconDataArray.forEach(param => icon[param] = true)
        return icon
      },
      createMenuObj () {
        let menuObj = {}
        let parentList = this.formItem.parentList
        let pid = parentList.length>0?parentList[parentList.length-1]:1
        switch (this.tabIndex){
          case 0:
            Object.assign(menuObj,{
              parent: {id: pid},
              name: this.formItem.name,
              icon: this.formItem.icon,
              skin: this.formItem.skin
            })
            break;
          case 1:
            Object.assign(menuObj,{
              parent: {id: pid},
              name: this.formItem.name,
              icon: this.formItem.icon
            })
            break;
          case 2:
            Object.assign(menuObj,{
              parent: {id: pid},
              name: this.formItem.name,
              icon: this.formItem.icon,
              url: this.formItem.url,
              permission: permission
            })
            break
        }
        return menuObj
      }
    }
  }
</script>

<style lang="less" scoped>
  .module{
    position: relative;
    min-height: 650px;
    overflow: hidden;
  }
  .tree {
    width: 200px;
    overflow: auto;
    height: 100%;
    position: absolute;
    border-right: 1px solid #d4dde2;
  }
  .tree-list{
    margin-left: 199px;
    padding-left: 26px;
  }
  .nav {
    padding-bottom: 24px;
  }
  .i-btn-group{
    padding-top: 24px;
  }
</style>

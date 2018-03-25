<template>
  <div>
    <div class="card-header">
      <Button icon="plus" @click="addAction">新增</Button>
      <Button icon="refresh"  @click="refreshAction">刷新</Button>
    </div>
    <div class="card-body card-padding">
      <Spin size="large" fix v-if="spinShow"></Spin>

      <div class="row">
        <div v-for="(role,index) in roles" class="col-md-3 col-sm-4">
          <template v-if="role._index>-1">
            <template v-if="role.edit" >
            <Input v-model="role.name">
              <span slot="prepend">角色名称</span>
            </Input>
            <br>
            <Input v-model="role.roleType">
              <span slot="prepend">角色标识</span>
            </Input>
            <br>
            <Tree :data="role.menus" show-checkbox multiple ref="tree"></Tree>
            <Button type="primary" @click="submitAction(role)">完成</Button>
            <Button @click="cancelAction(role)">取消</Button>
          </template>
            <template  v-else >
            <h3 >{{role.name}}<br> <small> <span  v-text="role.roleType"></span>
              <Button style="margin-left: 100px" size="small"  @click="role.edit = !role.edit"><Icon  type="compose" ></Icon></Button >
              <Button size="small"  @click="deleteAction(role.id)">
                <Icon type="trash-b">
                </Icon>
              </Button >
            </small></h3>
            <Tree :data="role.holdMenus"  ></Tree>
          </template>
          </template>
        </div>
      </div>

    </div>

    <Modal v-model="deleteActionModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>确认删除</span>
      </p>
      <div style="text-align:center">
        <p>确认删除?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="deleteRole">删除</Button>
      </div>
    </Modal>

  </div>

</template>
<script>
  import {listRole,modifyRole,addRole,deleteRole} from '../../api/sys/RoleApi'

  let log = console.log;
  export default {
    data() {
      return {
        roles: [],
        menus:[],
        deleteActionModal:false,
        spinShow: true,
        deleteIds:[]
      }
    },
    mounted() {
      this.loadData();
    },
    methods:{
      loadData(){
        this.spinShow = true;
        listRole((roles,menus)=>{
          this.menus = menus;
          log(roles);
          roles.forEach((role,index)=>{
            role._index = index;
            role.edit = false;
            role.holdMenus = this.showTree(role.menus);
          });
          this.roles = roles;
          this.spinShow = false;
        })
      },
      edit(role){
        log(role)
      },
      addAction(){
        this.roles.push({
          _index: this.roles.length,
          name: '',
          roleType:'',
          edit: true,
          menus:this.menus,
        });
      },
      refreshAction(){
        this.loadData();
      },
      deleteAction(id){
        this.deleteIds = [id];
        this.deleteActionModal=true;
      },
      deleteRole(){
        deleteRole(this.deleteIds,res=>{
          this.loadData();
          this.$Message.success('删除成功');
          this.deleteActionModal = false;
        },_=>{
          this.$Message.error('删除失敗')
        })
      },
      submitAction(role){
        role.holdMenus = this.showTree(role.menus);
        let holdMenuIds = this.listHoldMenuId(role.holdMenus);
        let params = {
          name: role.name,
          roleType: role.roleType,
          menuSet: holdMenuIds
        };
        this.modifyOrAddRole(role,params)
      },
      cancelAction(role){
        if(!role.id){
          this.roles.splice(role._index,1,{})
        }else{
          role.edit = false;
        }
      },
      listHoldMenuId(holdMenus){
        let ms = [];
        function flatMap(array) {
          array.forEach(a=>{
            ms.push(a);
            if(a.children){
              flatMap(a.children);
            }
          })
        }
        flatMap(holdMenus);
        let msIds = [{id:1}];
        ms.forEach(m=>{
          msIds.push({id:m.id})
        });
        return  msIds;
      },
      modifyOrAddRole(role,params){
        if(role.id){
          modifyRole(role.id,params,res=>{
            this.$Message.success('修改成功');
            role.edit = false;
          },_=>{
            this.$Message.error('修改失敗')
          })
        }else{
          addRole(params,res=>{
            this.$Message.success('添加成功');
            role.edit = false;
          },_=>{
            this.$Message.error('添加失敗')
          })
        }
      },
      showTree (data) {
        let nodes  = [];
        for(let node of data){
          this.buildTree(nodes,node);
        }
        return nodes;
      },
      buildTree(nodes, node) {
        node = Object.assign({}, node)
        if (node.checked||node.indeterminate) {
          nodes.push(node)
        }
        if (node.children) {
          let nodes1 = [];
          for (let node1 of node.children) {
            this.buildTree(nodes1, node1)
          }
          node.children = nodes1;
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

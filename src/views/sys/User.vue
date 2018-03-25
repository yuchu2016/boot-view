<template>
  <div>
    <div class="card-header">
      <Button icon="plus" @click="openAddModal">新增</Button>
      <div class="pull-right">
        <Input v-model="value" placeholder="輸入用戶名模糊查询..." style="width: 200px"></Input>
        <Button type="primary" icon="ios-search" :loading="loadingSearch" @click="search"></Button>
      </div>
    </div>
    <div class="card-body card-padding">
      <Table :loading="loadingSearch" :columns="columns" :data="list"></Table>
    </div>
    <div class="card-footer">
      <div class="page pull-right">
        <Page :total="totalElements" show-elevator show-sizer show-total></Page>
      </div>
    </div>

    <Modal
      v-model="modal1"
      @on-ok="addOrUpdateAction"
      :title="modalTitle">
      <Form ref="formValidate" :label-width="80">
        <FormItem v-if="modalTitle=='新增'" label="用户名" prop="loginName">
          <Input v-model="user.loginName" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem v-else label="昵称" prop="nickname">
          <Input v-model="user.nickname" placeholder="输入昵称"></Input>
        </FormItem>
        <FormItem label="头像" prop="avatar">
          <Input v-model="user.avatar" placeholder="输入头像地址"></Input>
        </FormItem>
        <FormItem label="角色">
          <CheckboxGroup v-model="user.roleSet">
            <Checkbox v-for="role in roles" :label="role.name" :key="role.id"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="user.sex">
            <Radio label="MAN">男</Radio>
            <Radio label="WO_MAN">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="user.phone" placeholder="输入手机号"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="user.email" placeholder="输入邮箱"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="user.remark" placeholder="输入备注"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <RadioGroup v-model="user.status">
            <Radio label="NORMAL">正常</Radio>
            <Radio label="ABNORMAL">异常</Radio>
            <Radio label="FROZEN">冻结</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="modalPwd"
      @on-ok="changePwdAction"
      title="修改密码">
      <Form ref="formValidate1" :label-width="80">
        <FormItem label="密码" prop="password">
          <Input v-model="user.password" placeholder="输入新的密码"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import moment from 'moment'
  import log from '../../utils/LogUtils'
  import {findByLoginNameLike, listRole, addOrUpdate, changePwd, deleteByIds} from '../../api/sys/UserApi'

  export default {
    data() {
      return {
        modal1: false,
        modalTitle: '编辑',
        modalPwd: false,
        user: {},
        roles: [{id: 2, name: '日志管理员'}],
        value: '',
        loadingSearch: false,
        totalElements: 0,
        columns: [
          {
            title: '账号',
            width: 100,
            key: 'loginName',
            sortable: true
          },
          {
            title: '昵称',
            width: 100,
            key: 'nickname',
            sortable: true
          },
          {
            title: '性别',
            width: 80,
            render: (h, params) => {
              return h('div', params.row.sex == 'MAN' ? '男' : '女');
            }
          },
          {
            title: '年龄',
            key: 'birthday',
            width: 80,
            render: (h, params) => {
              if (params.row.birthday) {
                return h('div', moment().format('YYYY') - moment(params.row.birthday).format('YYYY'));
              }
            },
            sortable: true
          },
          {
            title: '手机',
            width: 100,
            key: 'phone',
            sortable: true
          },
          {
            title: '邮箱',
            width: 100,
            key: 'email',
            sortable: true
          },
          {
            title: '角色',
            width: 150,
            render: (h, params) => {
              return h('div', params.row.roleSet.map((role) => {
                return role.name
              }).join(','));
            }
          },
          {
            title: '备注',
            key: 'remark',
            width: 100,
            sortable: true
          },
          {
            title: '学号',
            key: 'stuId',
            width: 100,
            sortable: true
          },
          {
            title: '学院',
            key: 'college',
            width: 100,
            sortable: true
          },
          {
            title: ' '
          },
          {
            title: '注册时间',
            key: 'createdTime',
            width: 150,
            render: (h, params) => {
              if (params.row.createdTime) {
                return h('div', moment(params.row.createdTime).format('YYYY-MM-DD hh:mm'));
              } else {
                return h('div');
              }
            },
            sortable: true
          },
          {
            title: '状态',
            key: 'status',
            width: 100,
            sortable: true,
            render: (h, params) => {
              let status = params.row.status;
              return h('span', {
                'class': {
                  label: true,
                  'label-success': status == 'NORMAL',
                  'label-danger': status == 'ABNORMAL',
                  'label-default': status == 'FROZEN',
                },
              }, status == 'NORMAL' ? '正常' : (status == 'ABNORMAL' ? '异常' : '冻结'));
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: '修改密码',
                    placement: 'right'
                  }
                }, [h('Button', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openChangedPwdModal(params.row.id)
                    }
                  }
                }, [h('Icon', {
                  props: {
                    type: 'locked'
                  }
                })])]),
                h('Tooltip', {
                  props: {
                    content: '编辑',
                    placement: 'right'
                  }
                }, [h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openEditModal(params.row)
                    }
                  }
                }, [h('Icon', {
                  props: {
                    type: 'edit'
                  }
                })])]),

                h('Tooltip', {
                  props: {
                    content: '删除',
                    placement: 'left'
                  }
                }, [h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteAction(params.row.id)
                    }
                  }
                }, [h('Icon', {
                  props: {
                    type: 'trash-a'
                  }
                })])]),
              ]);
            }
          }
        ],
        list: []
      }
    },
    mounted() {
      this.initRoles();
      this.search();
    },
    methods: {
      initRoles() {
        listRole((data) => {
          if (data.status == 'SUCCESS') {
            this.roles = data.content.content;
          } else {
            this.$Message.error(data.msg);
          }
        })
      },
      search() {
        this.loadingSearch = true;
        findByLoginNameLike(this.value, (data) => {
          if (data.status == 'SUCCESS') {
            this.list = data.content.content;
            this.totalElements = data.content.totalElements;
            this.loadingSearch = false;
          } else {
            this.$Message.error(data.msg);
          }
        })
      },
      openAddModal() {
        this.modalTitle = '新增';
        this.user = {};
        this.modal1 = true;
      },
      openEditModal(user) {
        this.modalTitle = '编辑';
        this.user = Object.assign({}, user);
        this.user.roleSet = this.user.roleSet.map((role) => {
          return role.name
        });
        this.modal1 = true;
      },
      openChangedPwdModal(id) {
        this.user = {};
        this.user.id = id;
        this.modalPwd = true;
      },
      deleteAction(userId) {
        deleteByIds([userId], (data) => {
            this.search();
        })
      },
      addOrUpdateAction() {
//        this.user.id=undefined;
        this.user.roleSet = this.user.roleSet.map(roleName => {
          for (let r of this.roles) {
            if (roleName == r.name) {
              return r;
            }
          }
        })
        addOrUpdate(this.user, (data) => {
          this.search();
        })
      },
      changePwdAction() {
        changePwd(this.user.id, this.user.password, (response) => {
//          console.log(response)
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  .card-footer {
    padding: 0 25px;
    min-height: 60px;
  }
</style>

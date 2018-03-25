<template class="body">
  <div class="login" :style="'background-image: url('+bg+')'" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">欢迎登陆SanJi Boot</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import bus from  '../bus'
  import login from '../api/loginApi'
  export default {
    data () {
      return {
        bg:'/static/app/img/bg-1.jpg',
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    mounted(){
      var bg_sum = Math.ceil(Math.random() * 3)
      this.bg=`/static/img/bg-${bg_sum}.jpg`
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {


          if (valid) {
            //登录成功调用
            login(this.form.userName,this.form.password,(res)=>{
              let token = res.headers.authorization;
              if(token){
                bus.state.token=token;
                let redirect = '?redirect=';
                let index = this.$route.fullPath.indexOf(redirect);
                if(index>0){
                  this.$router.push(this.$route.fullPath.substr(index+redirect.length).replace(/%2F/g,'/'))
                }else{
                  this.$router.push('/')
                }
              }else{
                this.$Message.error('用户名或密码错误请核对后重新输入');
              }
            },(err)=>{
              this.$Message.error('服务器错误请联系管理员');
            })
          }
        });
      }
    },
  };
</script>

<style lang="less" scoped>
  .login{
    position: fixed;
    width: 100%;
    height: 100%;
    /*background-image: url('/static/app/img/bg-2.jpg');*/
    background-size: cover;
    background-position: center;
  }
  .login{
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>

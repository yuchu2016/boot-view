export default {
  state: {
    menu_title: 's',
    get token(){
      return sessionStorage.getItem('token')
    },
    set token(val){
      sessionStorage.setItem('token',val)
    },
    permissions:[]
  },
  action:{
    //是否拥有该权限
    hasPermissions(self,per){
      let perList = self.state.permissions;
      for(let p of perList){
        if(p==per){
          return true;
        }
      }
      return false;
    }
  }
}

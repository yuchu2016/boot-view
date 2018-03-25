import axios from './http'

const api = '/api/user/current/'

export function listMenu(cb) {
  axios.get(api+'menu').then((res)=>{
    let data = res.data.content;
    console.log(res)
    let menus = data[0].children;
    for(let menu of menus){
      replace(menu);
    }
    var d = {
      system_list:data,
      current_system:data[0],
      menus
    }
    cb(d);
  })

}

export function getUserName(cb) {
  axios.get(api).then((res)=>{
    cb(res.data.content);
  })
}

export function getMenusBySys(id,cb) {
  axios.get(api+'menu').then((res)=>{
    let data = res.data.content;
    for(let s of data){
      if(id == s.id){
        let menus = s.children;
        if(menus){
          for(let menu of menus){
            replace(menu);
          }
          cb(menus);
        }else{
          cb([])
        }
      }
    }
  })
}

let replace = (node) => {
  node.path = node.url;
  node.isOpenTab = true;
  if (node.children) {
    for (let c of node.children) {
      replace(c);
    }
  }
}

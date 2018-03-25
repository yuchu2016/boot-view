import axios from '../http'

let error = console.error;

const api = '/api/role/';

export function listRole(cb) {
  //替换名字
  let replace = (node) => {
    node.title = node.name;
    if (node.children) {
      for (let c of node.children) {
        replace(c);
      }
    }
  }
  //添加勾选
  let select = (nodes, nodesIdMap) => {
    for (let node of nodes) {
      checkedNode(node, nodesIdMap);
    }
  }
  let checkedNode = (node, nodesIdMap) => {
//        log('nodes', node)
    if (nodesIdMap.get(node.id)) {
      node.checked = true;
    }
    if (node.children) {
      select(node.children, nodesIdMap);
    }
  }
  //创建需要勾选的id
  let createNodesIdMap = (nodes) => {
    let map = new Map();
    for (let node of nodes) {
      map.set(node.id, true);
    }
    return map;
  }
  axios.get('/api/menu').then((res) => {
    var nodes = res.data.content;
    for (let node of nodes) {
      replace(node);
    }
    axios.get('api/role').then((res1) => {
      let roleArray = [];
      let roles = res1.data.content.content;
      for (let role of roles) {
        let menus = JSON.parse(JSON.stringify(nodes));
        let map = createNodesIdMap(role.menuSet);
        select(menus, map);
        let role1 = {
          id: role.id,
          name: role.name,
          roleType: role.roleType,
          menus: menus,
        }
        roleArray.push(role1);
      }
      cb(roleArray, nodes);
    })

  })
}

export function modifyRole(id, params, cb, fcb = () => error('modifyRole')) {
  axios.put(api + id, params).then((response) => {
    cb(response.data);
  }).catch(error => {
    fcb(error)
  })
}

export function addRole(params, cb, fcb = () => error('addRole')) {
  axios.post(api, params).then((response) => {
    cb(response.data);
  }).catch(error => {
    fcb(error)
  })
}

export function deleteRole(ids, cb, fcb = () => error('deleteRole')) {
  axios({
    method: 'delete',
    url: api,
    data: ids
  }).then((response) => {
    cb(response.data);
  }).catch(error => {
    fcb(error)
  })
}

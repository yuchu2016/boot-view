import axios from '../http'

let error = console.error;

const api = '/api/menu/';


export function listMenuTree(cb, fcb) {
  //替换名字
  let replace = (node) => {
    node.title = node.name;
    if (node.children) {
      for (let c of node.children) {
        replace(c);
      }
    }
  }

  axios.get(api).then((res) => {
    let nodes = res.data.content;
    for (let node of nodes) {
      replace(node);
    }
    cb(nodes)
  }).catch(error => {
    fcb(error)
  })
}

export function findByParent(pid, cb, fcb) {
  axios.get(`${api}${pid}/child`).then((res) => {
    cb(res.data.content)
  }).catch(error => {
    fcb(error)
  })
}

export function modifyMenu(id, params, cb,  fcb = () => error('modifyMenu')) {
  axios.put(api + id, params).then((response) => {
    cb(response.data);
  }).catch(error => {
    fcb(error)
  })
}

export function addMenu(params, cb,  fcb = () => error('addMenu')) {
  axios.post(api, params).then((response) => {
    cb(response.data);
  }).catch(error => {
    fcb(error)
  })
}

export function deleteMenu(ids, cb,  fcb = () => error('deleteMenu')) {
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

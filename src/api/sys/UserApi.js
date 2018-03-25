import axios from '../http'

const api = '/api/user/';

export function addOrUpdate(user, cb) {
  if (user.id) {
    axios.put(api + user.id,user).then((response) => {
      cb(response.data);
    })
  } else {
    axios.post(api, user).then((response) => {
      cb(response.data);
    })
  }
}

export function deleteByIds(ids,cb) {
  axios({
    method: 'delete',
    url: api,
    data:ids
  }).then((response)=> {
    cb(response.data);
  })
}

export function changePwd(id, password, cb) {
  var params = new URLSearchParams();
  params.append('password', password);
  axios.put(api + id + '/password', params).then((response) => {
    cb(response.data);
  })
}


export function findByLoginNameLike(loginName, cb) {
  axios.get(api, {params: {loginName: loginName}}).then((response) => {
    let data = response.data;
    cb(data);
  });
}

export function listRole(cb) {
  axios.get('/api/role').then((response) => {
    cb(response.data);
  });
}

import axios from './http'

export default function (username,password,cb,fcb) {
  axios.post('/api/login',{username,password}).then((res)=>{
    cb(res);
  }).catch((err)=>{
    fcb(err);
  })
}

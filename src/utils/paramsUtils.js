export default function (params) {
  let q = '';
  for(let key of Object.keys(params)){
    if(params[key]){
      q+=`&${key}=${params[key]}`;
    }
  }
  return q.indexOf('&')>-1?q.replace('&','?'):'';
}

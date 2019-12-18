const request = require('request-promise-native');
const basic = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0',
<<<<<<< HEAD

=======
      "Authorization": "token 0e66a46398b1614dc9def4f4417a0a418153158c"
>>>>>>> b77442f5618cf84793f1c8c180713b2b018caac2
  }
}
const ajax = (options) => {
  return new Promise((resolve, reject) => {
    request({...basic, ...options}).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}
module.exports = ajax

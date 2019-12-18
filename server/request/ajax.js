const request = require('request-promise-native');
const basic = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0',
      "Authorization": "token 513f680e101c9c74b067eb519a140029a96d5bdc"
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
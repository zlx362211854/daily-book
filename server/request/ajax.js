const request = require('request-promise-native');
const basic = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0',
      "Authorization": "token ae9572b8c7ab4d7506dbd3b3427cbe795f2ff3b8"
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
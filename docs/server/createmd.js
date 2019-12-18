const fs = require('fs')
const path = require('path')
const createmd = function({name, text}) {
  fs.writeFile(path.dirname(__filename) + "/../md/" + name, text, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("文件"+ name +"创建成功");
  });
}
module.exports = createmd

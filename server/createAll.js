const fs = require('fs')
const path = require('path')
const ajax = require("./request/ajax")
const createmd = require("./createmd")
const moment = require('moment')
const execSync = require('child_process').execSync;
module.exports = function createAll() {
  ajax({url: 'https://api.github.com/repos/zlx362211854/daily-study/issues?per_page=1000'}).then((body) => {
    if (body) {
      console.log('获取issues成功')
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
          let summary = ''
          const promiseList = []
          for (let i = 0; i < body.length; i++) {
            const item = body[i]
            const promise = ajax({url: item.comments_url})
            promiseList.push(promise)
            promise.then((data) => {
              Promise.resolve(data)
            })
          }
          Promise.all(promiseList).then((issues) => {
            issues.forEach((issue, index) => {
              try {
                const data = JSON.parse(issue)
                let comments = ''
                data.forEach(comment => {
                  comments += `\r\n# ${comment.user.login} \r\n > commented ${moment(comment.created_at).fromNow()} \r\n\r\n` + comment.body
                    .replace(/```/g, '\r\n```')
                    .replace(/{{/g, '{% raw %}{{')
                    .replace(/}}/g, '}}{% endraw %}')
                })
                createmd({
                  name: body[index].id + '.md',
                  text: comments
                })
                summary += `\r\n* [${body[index].title}](./md/${body[index].id}.md)`
              } catch (err) {
                console.log(err)
              }
            })
            fs.writeFile(path.dirname(__filename) + '/../SUMMARY.md', summary, function(error) {
              if (error) {
                console.log(error);
                return false;
              }
              console.log('summary写入成功');
              console.log('更新完成✅,开始gitbook打包...');
              execSync('gitbook build', {cwd: '../'});
              execSync('rm -rf ./docs', {cwd: '../'});
              execSync('mv ./_book ./docs', {cwd: '../'});
              execSync('git add -A', {cwd: '../'});
              execSync('git commit -am "new book 💐"', {cwd: '../'});
              execSync('git push origin master', {cwd: '../'});
              console.log('gitbook上传成功✅');
            })
          })
        } catch (err) {
          console.log('something error: ', err);
        }
      }
    }
  })
}
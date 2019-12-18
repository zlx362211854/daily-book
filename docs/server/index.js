const schedule = require('node-schedule');
const createAll = require('./createAll')
const moment = require('moment')
const  scheduleCronstyle = () => {
  //每天1点1分0秒时更新
  schedule.scheduleJob('0 32 14 * * *', () => {
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '开始更新book...')
      createAll()
    }); 
}

scheduleCronstyle();

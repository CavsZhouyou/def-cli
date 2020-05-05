const saveUserData = require('../utils/saveUserData');
const ora = require('ora');

console.log('');
const spinner = ora('退出登录中....');
spinner.start();

saveUserData('', '');

setTimeout(() => {
  spinner.succeed();
  console.log('退出登录成功！');
}, 2000);

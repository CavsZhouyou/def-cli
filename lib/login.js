const { loginRequest } = require('../utils/requests');
const inquirer = require('inquirer');
const saveUserData = require('../utils/saveUserData');
const ora = require('ora');

inquirer
  .prompt([
    {
      name: 'account',
      message: '请输入账号',
    },
    {
      name: 'password',
      message: '请输入密码',
      type: 'password',
    },
  ])
  .then((answers) => {
    console.log('');
    const spinner = ora('用户登录中....');
    spinner.start();

    loginRequest(answers.account, answers.password).then((result) => {
      if (result.success) {
        const { userId, userName } = result.data;
        saveUserData(userId, userName);
        setTimeout(() => {
          spinner.succeed();
          console.log('登录成功! 当前用户为:', userName);
        }, 2000);
      } else {
        setTimeout(() => {
          spinner.fail();
          console.log('登录失败! message:', result.message);
        }, 2000);
      }
    });
  })
  .catch((error) => {
    console.log(error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

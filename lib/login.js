const { loginRequest } = require('../utils/requests');
const inquirer = require('inquirer');
const saveUserData = require('../utils/saveUserData');

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
    loginRequest(answers.account, answers.password).then((result) => {
      if (result.success) {
        const { userId, userName } = result.data;
        saveUserData(userId, userName);
        console.log('登录成功 当前用户为:', userName);
      } else {
        console.log('登录失败！ 失败原因:', result.message);
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

const program = require('commander');
const exec = require('child_process').execSync;
const user = require('../store/user.json');
const { publishRequest } = require('../utils/requests');

program
  .option('-o, --online', '线上发布')
  .option('-d, --daily', '日常发布')
  .parse(process.argv);

const path = exec('pwd').toString('utf8').trim();
const commit = exec('git rev-parse --short HEAD').toString('utf8').trim();
const branch = exec('git rev-parse --abbrev-ref HEAD').toString('utf8').trim();
const projectName = require(`${path}/package.json`).name;
const appGroup = require(`${path}/package.json`).group;
const appName = `${appGroup}/${projectName}`;
const userId = user.userId;
const publishEnv = program.online ? 'online' : 'daily';

const ora = require('ora');

console.log('');
const spinner = ora('项目正在发布中....');
spinner.start();

publishRequest(branch, userId, appName, commit, publishEnv).then((result) => {
  if (result.success) {
    spinner.succeed();
    console.log('发布成功! 发布地址为:' + result.address);
  } else {
    spinner.fail();
    console.log('发布失败! 失败原因:' + result.message);
  }
});

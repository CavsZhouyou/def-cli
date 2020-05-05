const program = require('commander');

program
  .version('1.0.0')
  .usage('<command> [项目名称]')
  .command('init', '创建新项目')
  .command('login', '用户登录')
  .command('logout', '退出登录')
  .command('publish', '项目发布')
  .alias('p')
  .parse(process.argv);

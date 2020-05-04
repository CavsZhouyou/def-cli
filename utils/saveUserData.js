const fs = require('fs');
const savedFile =
  '/Users/zhouyou/Project/coding-file/node-project/def-cli-project/def-cli/store/user.json';

module.exports = function (userId, userName) {
  fs.readFile(savedFile, function (err, data) {
    if (err) {
      return console.error(err);
    }
    let user = data.toString(); //将二进制的数据转换为字符串
    user = JSON.parse(user); //将字符串转换为json对象
    user.userId = userId;
    user.userName = userName;
    var str = JSON.stringify(user); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(savedFile, str, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });
};

/*
 * @Author: zhouyou@werun
 * @Descriptions: 封装一些通用的请求
 * @TodoList: 无
 * @Date: 2020-04-14 17:29:17
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2020-05-04 16:16:10
 */
const axios = require('axios');
const md5 = require('md5');

const host = 'http://192.168.3.61:4000';

/**
 * 用户登录
 *
 * @param {*} account
 * @param {*} password
 * @returns
 */
module.exports.loginRequest = async (account, password) => {
  const api = `${host}/def/auth/loginWithoutJWT`;

  return axios
    .post(api, { account, password: md5(password) })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      return {
        success: false,
        message: '用户登录失败！',
      };
    });
};

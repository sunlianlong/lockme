## 简介

##### LockMe 是什么呢？

* 一款免费开源的密码管理小程序。
* 源码地址 [https://github.com/pushmetop/lockme](https://github.com/pushmetop/lockme) 。

##### LockMe 怎么保证安全性？

* 采用了 `国密算法 SM2` 的公私钥算法。
* 私钥由用户个人进行保存。
* 私钥不进行触网。
* 密码数据都由公钥进行加密存储。

## 使用与配置

##### 初始化项目

* 创建 `project.config.json` 并配置 `appid`
* 复制 `miniprogram/config-example.js` 为 `miniprogram/utils/Config.js` 环境变量
* 配置 `miniprogram/utils/Config.js` 环境变量
* 复制 `cloudfunctions` 文件夹到 `miniprogram` 并`npm i` 安装依赖
* 上传 `cloudfunctions/` 云函数
* 根据 `cloudfunction.collection` 创建云数据库

##### 环境变量说明

* `cloud.env` 小程序云环境 ID
* `cloud.collection` 小程序云的对应数据库集合
* `cloud.collection.safes` 密码集合
* `cloud.collection.settings` 设置集合
* `cloud.collection.publicKeys` 公钥集合
* 其他配置请参考小程序官方文档 [传送门](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)


## 演示

##### 小程序二维码
![初始化](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/qrcode.png)

##### 初始化
![初始化](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/init.png)

##### 密码中心
![密码中心](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/index.png)

##### 设置
![设置](https://raw.githubusercontent.com/pushmetop/resource/master/pushmetop.github.io/lockme/setting.png)

## 设计理念

基于大家日常生活中最常使用的网站 `百度` 的交互进行设计，更方便和直觉的让用户使用 `LockMe`。
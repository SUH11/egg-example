'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index)
  router.get('/users', controller.user.getUserList)
  router.get('/userById', controller.user.getUserById)
  router.post('/createUser', controller.user.createUser)
  router.post('/deleteUserById', controller.user.deleteUserById)
  router.post('/updateById', controller.user.updateById)
  router.get('/wxUsers', controller.wxUser.getWxUserList)
  router.post('/addWxUser', controller.wxUser.addWxUser)
  router.post('/updateWxUserById', controller.wxUser.updateWxUserById)
};

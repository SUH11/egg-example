'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index)
  router.get('/users', controller.user.getUserList)
  router.get('/userById', controller.user.getUserById)
  router.get('/createUser', controller.user.createUser)
  router.post('/updateById', controller.user.updateById)
};

// 'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
// };

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.cors = {
  enable: true,
  package: 'egg-cors'
};

exports.static = {
  enable: true,
  package: 'egg-static'
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

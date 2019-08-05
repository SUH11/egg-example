
/**
 * success
 * code 1
 */
exports.success = (ctx, result = null, message = 'Succeed') => {
    ctx.body = {
        code: 0,
        message: message,
        data: result
      };
}


/**
 * error
 * code 0
 */
exports.error = (ctx, code = 1, message) => {
  ctx.body = {
    code: code,
    message: message
  }
}
// error code 说明： 0 成功  1 系统异常  2 校验失败
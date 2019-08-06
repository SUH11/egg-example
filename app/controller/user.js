const Controller = require('egg').Controller
const struct = require('superstruct').struct

class UserController extends Controller {

    /**
     * 创建用户
     */
    async createUser() {
        const { ctx, service } = this
        const validator = struct({
            count: 'number',
            level: 'string',
            password: 'string',
            username: 'string',
            percent: 'number'
        })

        try {
            validator(ctx.request.body)
        } catch (e) {
            return ctx.helper.error(ctx, 2, '创建用户失败，请仔细核对格式！')
        }

        try {
            const createInfo = await service.user.create({
                ...ctx.request.body,
                lastTime: Date.now()
            })

            return ctx.helper.success(ctx, createInfo)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！插入数据失败！')
        }

    }

    /**
     * 通过_id来删除用户
     */
    async deleteUserById() {
        const { ctx, service } = this
        const validator = struct({
            _id: 'string'
        })

        try {
            validator(ctx.request.body)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 2, '删除用户失败，请仔细核对格式！')
        }

        try {
            const user = await service.user.deleteOneById(ctx.request.body._id)

            return ctx.helper.success(ctx, user)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！插入数据失败！')
        }
    }

    /**
     * 获取用户列表
     */
    async getUserList() {
        const { ctx, service } = this
        const validator = struct({
            pageSize: 'string?',
            pageNum: 'string?',
            sort: 'string?',
            order: 'string?'
        })

        try {
            validator(ctx.query)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 2, '获取用户列表失败，请仔细核对格式！')
        }

        try {
            const user = await service.user.find(ctx.query);
            return ctx.helper.success(ctx, user)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！获取用户列表失败！')
        }
    }

    /**
     * 通过_id获取用户信息
     */
    async getUserById() {
        const { ctx, service } = this
        const { _id } = ctx.query
        const validator = struct({
            _id: 'string'
        })

        try {
            validator(ctx.query)
        } catch (e) {
            return ctx.helper.error(ctx, 2, '数据格式错误！入参_id应为字符串类型！')
        }

        try {
            const user = await service.user.findById(_id)

            if (user) {
                return ctx.helper.success(ctx, user)
            } else {
                return ctx.helper.error(ctx, 1, '查询不到该用户信息！请仔细核对_id！')
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 通过id来更新用户记录
     */
    async updateById() {
        const { ctx, service } = this
        const { _id, ...rest } = ctx.request.body
        const validator = struct({
            _id: 'string'
        })

        try {
            validator({
                _id
            })
        } catch (e) {
            return ctx.helper.error(ctx, 2, '数据格式错误！入参_id应为字符串类型！')
        }

        try {
            const updateContent = {
                ...rest,
                lastTime: Date.now()
            }
            const user = await service.user.findByIdAndUpdate(_id, updateContent);

            return ctx.helper.success(ctx, user);
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！更新数据失败！')
        }
    }
}

module.exports = UserController;
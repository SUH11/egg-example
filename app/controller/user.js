const Controller = require('egg').Controller;
const struct = require('superstruct').struct;

class UserController extends Controller {

    /**
     * 创建用户
     */
    async createUser() {
        const { ctx, service } = this
        const validator = struct({
            name: 'string',
            gender: struct.enum(['male', 'female']),
            email: 'string',
            password: 'string',
            role: struct.enum(['0', '1']),
            activated: struct.enum(['0', '1'])
        })

        try {
            validator(ctx.query)
        } catch (e) {
            return ctx.helper.error(ctx, 0, '创建用户失败，请仔细核对格式！')
        }

        try {
            const createInfo = await service.user.create({
                ...ctx.query,
                role: Number(ctx.query.role),
                updatedAt: Date.now(),
                status: '1'
            })

            return ctx.helper.success(ctx, createInfo)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 0, '系统异常！插入数据失败！')
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
            return ctx.helper.error(ctx, 0, '数据格式错误！入参_id应为字符串类型！')
        }

        try {
            const user = await service.user.findById(_id)

            if (user) {
                return ctx.helper.success(ctx, user)
            } else {
                return ctx.helper.error(ctx, 0, '查询不到该用户信息！请仔细核对_id！')
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
            return ctx.helper.error(ctx, 0, '数据格式错误！入参_id应为字符串类型！')
        }

        try {
            const updateContent = {
                ...rest,
                updatedAt: Date.now(),
                status: '1'
            }
            const user = await service.user.findByIdAndUpdate(_id, updateContent);

            return ctx.helper.success(ctx, user);
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 0, '系统异常！更新数据失败！')
        }
    }
}

module.exports = UserController;
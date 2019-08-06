const Controller = require('egg').Controller
const struct = require('superstruct').struct

class WxUserController extends Controller {

    /**
     * 获取wxUser list
     */
    async getWxUserList() {
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
            return ctx.helper.error(ctx, 2, '获取wx用户列表失败，请仔细核对格式！')
        }

        try {
            const wxUser = await service.wxUser.find(ctx.query)
            
            return ctx.helper.success(ctx, wxUser)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！获取wx用户列表失败！')
        }
    }

    /**
     * 新增一个wxUser
     */
    async addWxUser() {
        const { ctx, service } = this
        const validator = struct({
            avatarUrl: 'string?',
            count: 'number?',
            nickName: 'string?'
        })

        try {
            validator(ctx.request.body)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 2, '新增wx用户失败，请仔细核对格式！')
        }

        try {
            const wxUser = await service.wxUser.create({
                ...ctx.request.body,
                lastTime: Date.now()
            })

            return ctx.helper.success(ctx, wxUser)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！新增wx用户失败！')
        }
    }

    /**
     * 通过id来更新用户记录
     */
    async updateWxUserById() {
        const { ctx, service } = this
        const validator = struct({
            _id: 'string',
            avatarUrl: 'string?',
            count: 'number?',
            nickName: 'string?'
        })

        try {
            validator(ctx.request.body)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 2, '修改wx用户失败，请仔细核对格式！')
        }

        try {
            const { _id, ...rest } = ctx.request.body
            
            // 更新
            await service.wxUser.findByIdAndUpdate(_id, rest)
            
            // 查询更新后的记录
            const wxUser = await service.wxUser.findById(_id)
            
            return ctx.helper.success(ctx, wxUser)
        } catch (e) {
            console.log(e)
            return ctx.helper.error(ctx, 1, '系统异常！更新wx用户失败！')
        }
    }
}

module.exports = WxUserController
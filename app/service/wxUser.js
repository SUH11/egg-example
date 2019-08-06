const Service = require('egg').Service

class WxUserService extends Service {

    /**
     * 新增一个wxUser
     * @param {Object} info 
     */
    async create(info) {
        return await this.ctx.model.WxUser.create(info)
    }
    
    /**
     * 根据_id更新记录
     * @param {String} _id 
     * @param {Object} content 
     */
    async findByIdAndUpdate(_id, content) {
        return await this.ctx.model.WxUser.findByIdAndUpdate(_id, content)
    }
    
    /**
     * 返回所有wxUser信息
     * sort: 排序的字段名称，默认按 updatedAt 最后更新时间来排序
     * order: 1 升序 -1 降序
     * @param 
     * @return 
     */
    async find(params) {
        const { 
            pageSize = '10', 
            pageNum = '1', 
            sort = 'lastTime', 
            order = 1 
        } = params
        const skip = +pageSize * (+pageNum - 1)

        const wxUsers = await this.ctx.model.WxUser.find({})
            .sort({ [sort]: order })
            .skip(skip)
            .limit(+pageSize)

        return Object.assign( {
            pageNum,
            pageSize,
            sort,
            order,
            list: wxUsers
        })
    }

    /**
     * 通过id来查找wxUser
     * @param {String} _id 
     */
    async findById(_id) {
        return await this.ctx.model.WxUser.findById({ _id })
    }

}

module.exports = WxUserService
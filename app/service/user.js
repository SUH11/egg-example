const Service = require('egg').Service;

class UserService extends Service {

    /**
     * 新增一个user
     * @param {Object} info 
     */
    async create(info) {
        return await this.ctx.model.User.create(info)
    }

    /**
     * 返回所有user信息
     * sort: 排序的字段名称，默认按 updatedAt 最后更新时间来排序
     * order: 1 升序 -1 降序
     * @param 
     * @return 
     */
    async find(params) {
        const { pageSize = '1', pageNum = '10', sort = 'updatedAt', order = 1 } = params;
        const skip = +pageSize * (+pageNum - 1)

        const users = await this.ctx.model.User.find({}, {
            password: 0,
            salt: 0,
            activated: 0
        }).sort({ [sort]: order }).skip(skip).limit(+pageSize)

        return Object.assign({ pageNum, pageSize, sort, order, list: users})
    }

    /**
     * 通过条件查询，返回符合条件的第一个user
     * @param {Object} condition 
     */
    async findOne(condition) {
        return await this.ctx.model.User.findOne(condition, {
            password: 0,
            salt: 0,
            activated: 0
        })
    }

    /**
     * 通过_id查询 user
     * @param {String} _id 
     */
    async findById(_id) {
        return await this.ctx.model.User.findById({ _id }, {
            password: 0,
            salt: 0,
            activated: 0
        })
    }

    /**
     * 通过_id更新记录
     * @param {String} _id 
     * @param {Object} data 
     */
    async updateById(_id, data) {
        return await this.ctx.model.User.updateOne({ _id }, { $set: data })
    }

    /**
     * 通过id更新
     * @param {String} _id 
     * @param {Object} content 
     */
    async findByIdAndUpdate(_id, content) {
        return await this.ctx.model.User.findByIdAndUpdate(_id, content)
    }

}

module.exports = UserService;
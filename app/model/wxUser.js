module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    /**
     * wxUser:
        _id: Object(id)
        _openid: Object(id)
        avatarUrl: String
        count: Number
        lastTime: Number
        nickName: String
     */
    
    const WxUserSchema = new Schema({
        _openid: {
            type: Schema.Types.ObjectId
        },
        avatarUrl: {
            type: String
        },
        count: {
            type: Number,
            default: 0
        },
        lastTime: {
            type: Number
        },
        nickName: {
            type: String
        }
    }, { versionKey: false })

    const WxUser = mongoose.model('WxUsers', WxUserSchema)
    
    initialize(WxUser)

    return WxUser
}

/**
 * initialize wxUser
 */
function initialize(WxUser) {
    WxUser.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('initialize WxUser failed')
        } else if (!doc.length) {
            // 创建一个测试用户
            new WxUser({
                avatarUrl: 'test_avatarUrl',
                count: 100,
                lastTime: Date.now(),
                nickName: 'suhong'
            }).save()
        } else {
            console.log('---------initialize *wxUser* successfully---------')
        }
    })
}
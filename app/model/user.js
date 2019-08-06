// const rand = require('csprng') 生成随机数
// const sha1 = require('sha1') password加密用到 password: sha1('myPassword')
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    /**
     * user:
    _id: Object(id)
    count: Number
    lastTime: Number
    level: String
    password: String
    percent: Number
    username: String
    */

    const UserSchema = new Schema({
        count: {
            type: Number
        },
        lastTime: {
            type: Number
        },
        level: {
            type: String
        },
        password: {
            type: String
        },
        percent: {
            type: Number,
            default: 0
        },
        username: {
            type: String
        }
    }, { versionKey: false })
    const User = mongoose.model('Users', UserSchema)

    initialize(User)
    return User
}

/**
 * initialize user
 * @param User
 */
function initialize(User) {
    User.find({}, (err, doc) => {
        if (err) {
            console.log(err)
            console.log('initialize user failed')
        } else if (!doc.length) {
            // 创建一个测试用户
            new User({
                count: 21297,
                lastTime: Date.now(),
                level: 'Lv.15 圣心如水',
                username: '001',
                password: '001',
                percent: 100
            }).save()
        } else {
            console.log('---------initialize *user* successfully---------')
        }
    })
}


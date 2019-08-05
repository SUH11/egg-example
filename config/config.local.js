exports.mongoose = {
    client: {
        url: 'mongodb://127.0.0.1:27017/ant_blog',
        options: {}
    }
}

exports.redis = {
    client: {
        port: 6379,
        host: '127.0.0.1',
        password: '密码',
        db: 0
    }
}

exports.baseUrl = 'http://127.0.0.1:7001';
exports.redirectActivationUrl = 'http://127.0.0.1:8080/activation';
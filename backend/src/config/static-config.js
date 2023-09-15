const static_config = {
    DEFAULT_AVATAR_URL: 'https://mrt-1.s3.amazonaws.com/default-avt.jpg'
}

module.exports = function fetch_static_config(key) {
    return static_config[key]
}
const User = require('../model/User')
require('dotenv').config()

const findFriendByUserId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.friendId) {
                let friendId = data.friendId.replace('#', '')
                let user = await User.findOne({ _id: friendId })
                if (user && user.otpVerification === true) {
                    resolve({
                        errCode: 0,
                        message: 'success',
                        data: {
                            id: user._id,
                            name: user.name,
                            avatarUrl: user.avatarUrl,
                        }
                    })
                } else {
                    resolve({
                        errCode: 7,
                        errMessage: 'User not found'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { findFriendByUserId }
const errCodeMapping = {
    0: {
        errCode: 0,
        message: 'success',
    },
    1: {
        errCode: 1,
        errMessage: 'Error from the server'
    },
    2: {
        errCode: 2,
        errMessage: 'Missing required parameters'
    },
    3: {
        errCode: 3,
        errMessage: 'Email is already existing'
    },
    4: {
        errCode: 4,
        errMessage: 'Incorrect email or password'
    },
    5: {
        errCode: 5,
        errMessage: 'OTP is invalid or expired'
    },
    6: {
        errCode: 6,
        errMessage: 'Account is existed or current OTP is not expired'
    },
    7: {
        errCode: 7,
        errMessage: 'User not found'
    },
    8: {
        errCode: 8,
        errMessage: 'This user has been friended'
    },
    9: {
        errCode: 9,
        errMessage: 'You have already sent a friend request'
    },
    10: {
        errCode: 10,
        errMessage: 'Your friend has requested, Please approve!'
    },
    11: {
        errCode: 11,
        errMessage: 'You have rejected already'
    },
    12: {
        errCode: 12,
        errMessage: 'Friend request not found'
    },
    13: {
        errCode: 13,
        errMessage: 'You are not authorized to perform this function'
    },
    14: {
        errCode: 14,
        errMessage: 'Something went wrong'
    },
    15: {
        errCode: 15,
        errMessage: 'This conversation does not exist'
    }
}

module.exports = function handleError(errCode) {
    return errCodeMapping[errCode]
}
import unauthenService from '../service/unauthenService'

const registerAccount = async (req, res) => {
    try {
        let data = await unauthenService.registerAccount(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const loginAccount = async (req, res) => {
    try {
        let data = await unauthenService.loginAccount(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }

}

const verifyOTP = async (req, res) => {
    try {
        let data = await unauthenService.verifyOTP(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

const resendOTP = async (req, res) => {
    try {
        let data = await unauthenService.resendOTP(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    registerAccount, loginAccount, verifyOTP, resendOTP
}
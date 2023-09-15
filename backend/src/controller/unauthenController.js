import unauthenService from '../service/unauthenService'
import handleError from '../config/errCode'

const registerAccount = async (req, res) => {
    try {
        let data = await unauthenService.registerAccount(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const loginAccount = async (req, res) => {
    try {
        let data = await unauthenService.loginAccount(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }

}

const verifyOTP = async (req, res) => {
    try {
        let data = await unauthenService.verifyOTP(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const resendOTP = async (req, res) => {
    try {
        let data = await unauthenService.resendOTP(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const test = async (req, res) => {
    try {
        // let data = await unauthenService.resendOTP(req.body)
        let io = req.app.get('io')
        // io.emit('hello', 'world')
        io.to(req.query.id).emit('hello', 'world');
        // console.log()
        return res.status(200).json(handleError(0));
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

module.exports = {
    registerAccount, loginAccount, verifyOTP, resendOTP, test
}
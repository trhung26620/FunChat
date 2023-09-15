import authenService from '../service/authenService'
import handleError from '../config/errCode'

const findFriendByUserId = async (req, res) => {
    try {
        let data = await authenService.findFriendByUserId(req.query, req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const getCurrentUser = async (req, res) => {
    try {
        let data = await authenService.getCurrentUser(req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const addFriendByUserId = async (req, res) => {
    try {
        let data = await authenService.addFriendByUserId(req.body, req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const rejectFriendByUserId = async (req, res) => {
    try {
        let data = await authenService.rejectFriendByUserId(req.body, req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const approveFriendByUserId = async (req, res) => {
    try {
        let data = await authenService.approveFriendByUserId(req.body, req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const getContractListData = async (req, res) => {
    try {
        let data = await authenService.getContractListData(req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const logoutAccount = async (req, res) => {
    try {
        let data = await authenService.logoutAccount(req.userId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const updateAvatar = async (req, res) => {
    try {
        let data = await authenService.updateAvatar(req.userId, req.file)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const sendMessage = async (req, res) => {
    try {
        let data = await authenService.sendMessage(req.userId, req.body, req.app.get('io'))
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

const getMessageByConversationId = async (req, res) => {
    try {
        let data = await authenService.getMessageByConversationId(req.userId, req.params.id)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json(handleError(1))
    }
}

module.exports = {
    findFriendByUserId, addFriendByUserId, rejectFriendByUserId, approveFriendByUserId,
    getCurrentUser, getContractListData, logoutAccount, updateAvatar, sendMessage,
    getMessageByConversationId
}
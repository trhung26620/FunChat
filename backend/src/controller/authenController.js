import authenService from '../service/authenService'

const findFriendByUserId = async (req, res) => {
    try {
        let data = await authenService.findFriendByUserId(req.query)
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
    findFriendByUserId
}
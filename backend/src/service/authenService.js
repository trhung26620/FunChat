const User = require('../model/User')
const Message = require('../model/Message')
const FriendRequest = require('../model/FriendRequest')
const Conversation = require('../model/Conversation')
import handleError from '../config/errCode'
import { uploadFile, deleteFile } from './s3'
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
import fetch_static_config from '../config/static-config'
require('dotenv').config()

const fetchFriendRequest = async (currentUserId, friendId) => {
    try {
        let friendReq = await FriendRequest.findOne({
            requester: currentUserId,
            recipient: friendId,
        })
        if (friendReq) {
            return friendReq
        } else {
            friendReq = await FriendRequest.findOne({
                requester: friendId,
                recipient: currentUserId,
            })
            if (friendReq) {
                return friendReq
            } else {
                return null
            }
        }
    } catch (error) {
        console.log("🚀 ~ file: authenService.js:26 ~ fetchFriendRequest ~ error:", error)
    }
}

const fetchNewestMessage = async (conversationId) => {
    try {
        const newestMessage = await Message.findOne({ conversation_id: conversationId })
            .sort({ createdAt: -1 })
            // .populate('from')
            .exec()
        if (newestMessage) {
            return newestMessage
        } else {
            return null
        }
    } catch (error) {
        console.log("🚀 ~ file: authenService.js:26 ~ fetchFriendRequest ~ error:", error)
    }
}

const fetchFriendDataFromConversationId = async (conversationId, currentUserId) => {
    try {
        let conversation = await Conversation.findById(conversationId);
        let friendData = {}
        if (conversation) {
            if (conversation.members.length === 2) {
                for (let memberId of conversation.members) {
                    if (memberId != currentUserId) {
                        friendData = await User.findById(memberId)
                    }
                }
                if (friendData) {
                    return {
                        name: friendData.name,
                        avatarUrl: friendData.avatarUrl,
                        lastMessTime: conversation.updatedAt,
                        socketId: friendData.socketId,
                        lastTimeOnline: friendData.lastTimeOnline,
                        friendId: friendData._id
                    }
                } else {
                    return null
                }
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error) {
        console.log("🚀 ~ file: authenService.js:26 ~ fetchFriendRequest ~ error:", error)
    }
}

const findFriendByUserId = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.friendId && userId) {
                let friendId = data.friendId.replace('#', '')
                let user = await User.findOne({ _id: friendId })
                if (user && user.otpVerification === true) {
                    let friendReqStatus = 'NOT-REQUEST'
                    let friendReq = await fetchFriendRequest(userId, friendId)
                    if (friendReq && userId == friendReq.requester) {
                        if (friendReq.status === "PENDING") {
                            friendReqStatus = "PENDING"
                        } else if (friendReq.status == "APPROVED") {
                            friendReqStatus = "APPROVED"
                        } else if (friendReq.status == "REJECTED") {
                            friendReqStatus = "REJECTED"
                        } else {
                            friendReqStatus = 'NOT-REQUEST'
                        }
                    } else if (friendReq && userId == friendReq.recipient) {
                        if (friendReq.status === "PENDING") {
                            friendReqStatus = "WAIT-FOR-APPROVE"
                        } else if (friendReq.status == "APPROVED") {
                            friendReqStatus = "APPROVED"
                        } else if (friendReq.status == "REJECTED") {
                            friendReqStatus = "REJECTED"
                        }
                    } else {
                        friendReqStatus = 'NOT-REQUEST'
                    }
                    resolve({
                        ...handleError(0),
                        data: {
                            id: user._id,
                            name: user.name,
                            avatarUrl: user.avatarUrl,
                            friendReqStatus: friendReqStatus
                        }
                    })
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const addFriendByUserId = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.friendId && userId) {
                let friendId = data.friendId.replace('#', '')
                let user = await User.findOne({ _id: friendId })
                if (user && user.otpVerification === true) {
                    let friendReq = await fetchFriendRequest(userId, friendId)
                    if (friendReq && userId == friendReq.requester) {
                        if (friendReq.status === "APPROVED") {
                            resolve(handleError(8))
                        } else if (friendReq.status === "PENDING") {
                            resolve(handleError(9))
                        } else if (friendReq.status === "REJECTED") {
                            friendReq.status = "PENDING"
                            await friendReq.save()
                            resolve(handleError(0))
                        }
                    }
                    else if (friendReq && userId == friendReq.recipient) {
                        if (friendReq.status === "APPROVED") {
                            resolve(handleError(8))
                        } else if (friendReq.status === "PENDING") {
                            resolve(handleError(10))
                        } else if (friendReq.status === "REJECTED") {
                            friendReq.requester = userId,
                                friendReq.recipient = friendId,
                                friendReq.status = "PENDING"
                            await friendReq.save()
                            resolve(handleError(0))
                        }
                    }
                    else {
                        await FriendRequest.create({
                            requester: userId,
                            recipient: friendId,
                            status: "PENDING"
                        })
                        resolve(handleError(0))
                    }
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const rejectFriendByUserId = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.friendId && userId) {
                let friendId = data.friendId.replace('#', '')
                let friendReq = await fetchFriendRequest(userId, friendId)
                if (friendReq && userId == friendReq.requester) {
                    if (friendReq.status === "APPROVED") {
                        resolve(handleError(8))
                    } else if (friendReq.status === "PENDING") {
                        await friendReq.deleteOne()
                        resolve(handleError(0))
                    } else if (friendReq.status === "REJECTED") {
                        await friendReq.deleteOne()
                        resolve(handleError(0))
                    }
                }
                else if (friendReq && userId == friendReq.recipient) {
                    if (friendReq.status === "APPROVED") {
                        resolve(handleError(8))
                    } else if (friendReq.status === "PENDING") {
                        friendReq.status = "REJECTED"
                        friendReq.save()
                        resolve(handleError(0))
                    } else if (friendReq.status === "REJECTED") {
                        resolve(handleError(11))
                    }
                }
                else {
                    resolve(handleError(12))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const approveFriendByUserId = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.friendId && userId) {
                let friendId = data.friendId.replace('#', '')
                let friendReq = await fetchFriendRequest(userId, friendId)
                if (friendReq && userId == friendReq.requester) {
                    resolve(handleError(13))
                }
                else if (friendReq && userId == friendReq.recipient) {
                    if (friendReq.status === "APPROVED") {
                        resolve(handleError(8))
                    } else if (friendReq.status === "PENDING") {
                        let conversation = await Conversation.create({
                            name: '',
                            members: [userId, friendId]
                        })
                        await User.findByIdAndUpdate(userId,
                            {
                                $push: {
                                    friends: friendId,
                                    conversations: conversation._id
                                },

                            }, { new: true }).then(updatedUser => {
                                // console.log(updatedUser);
                            })
                            .catch(err => {
                                reject(err);
                            });
                        await User.findByIdAndUpdate(friendId,
                            {
                                $push: {
                                    friends: userId,
                                    conversations: conversation._id
                                }
                            }, { new: true }).then(updatedUser => {
                                // console.log(updatedUser);
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });

                        friendReq.status = "APPROVED"
                        // friendReq.conversations.push(conversation._id)
                        friendReq.save()
                        resolve(handleError(0))
                    } else if (friendReq.status === "REJECTED") {
                        resolve(handleError(11))
                    }
                }
                else {
                    resolve(handleError(12))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getCurrentUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                let user = await User.findById(userId);
                if (user) {
                    resolve({
                        ...handleError(0),
                        data: {
                            id: user.id,
                            name: user.name,
                            avatarUrl: user.avatarUrl,
                            email: user.email,
                            friends: user.friends,
                            conversations: user.conversations
                        }
                    })
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getContractListData = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                let user = await User.findById(userId);
                if (user) {
                    let contactDataList = [];
                    let conversationList = user.conversations
                    for (let conversationId of conversationList) {
                        let recipientData = await fetchFriendDataFromConversationId(conversationId, userId)
                        let newestMessage = await fetchNewestMessage(conversationId)
                        let onlineStatus = null;
                        if (recipientData.socketId) {
                            onlineStatus = true;
                        } else {
                            onlineStatus = recipientData.lastTimeOnline
                        }

                        if (newestMessage) {
                            contactDataList.push({
                                name: recipientData.name,
                                avatarUrl: recipientData.avatarUrl,
                                lastMessTime: newestMessage.updatedAt,
                                lastMessage: newestMessage.content,
                                from: newestMessage.from,
                                conversationId: conversationId,
                                onlineStatus: onlineStatus,
                                friendId: recipientData.friendId
                            })
                        } else {
                            contactDataList.push({
                                name: recipientData.name,
                                avatarUrl: recipientData.avatarUrl,
                                lastMessTime: recipientData.lastMessTime,
                                lastMessage: '',
                                from: '',
                                conversationId: conversationId,
                                onlineStatus: onlineStatus,
                                friendId: recipientData.friendId
                            })
                        }
                    }
                    resolve({
                        ...handleError(0),
                        data: contactDataList
                    })
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const logoutAccount = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                let user = await User.findById(userId);
                if (user) {
                    user.session = ''
                    await user.save()
                    resolve({
                        ...handleError(0),
                    })
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const updateAvatar = async (userId, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId && file) {
                let user = await User.findById(userId);
                if (user) {
                    const tempUrl = user.avatarUrl
                    const result = await uploadFile(file)
                    console.log("🚀 ~ file: authenService.js:412 ~ returnnewPromise ~ result:", result)
                    if (result && result.Location) {
                        user.avatarUrl = result.Location
                        await user.save()
                        await unlinkFile(file.path)
                        if (tempUrl !== fetch_static_config('DEFAULT_AVATAR_URL')) {
                            await deleteFile(tempUrl)
                        }
                        resolve({ ...handleError(0), data: { avatarUrl: result.Location } })
                    } else {
                        resolve(handleError(14))
                    }
                } else {
                    resolve(handleError(7))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const sendMessage = (userId, data, io) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId && data && 'conversationId' in data && 'message' in data) {
                const conversation = await Conversation.findOne({
                    _id: data.conversationId,
                    members: userId
                }).populate('members')
                if (conversation) {
                    let messageData = await Message.create({
                        conversation_id: data.conversationId,
                        from: userId,
                        content: data.message
                    })
                    const friend = conversation.members.find(member => {
                        return member._id != userId
                    })
                    if (friend.socketId) {
                        let date = new Date(messageData.createdAt)
                        io.to(friend.socketId).emit("updateMessage", {
                            data: {
                                content: data.message,
                                name: friend.name,
                                owner: false,
                                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                            },
                            conversationId: data.conversationId
                        })
                    }
                    let date = new Date(messageData.createdAt)
                    resolve({
                        ...handleError(0),
                        data: {
                            // name: friendName,
                            content: data.message,
                            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                            // owner: owner
                        }
                    })
                } else {
                    resolve(handleError(15))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

const getMessageByConversationId = (userId, conversationId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId && conversationId) {
                const conversation = await Conversation.findOne({
                    _id: conversationId,
                    members: userId
                }).populate('members')
                if (conversation) {
                    const friend = conversation.members.find(member => {
                        return member._id != userId
                    })
                    const friendName = friend.name
                    let messgeList = await Message.find({
                        conversation_id: conversationId
                    })
                    if (messgeList) {
                        let data = messgeList.map((message) => {
                            let date = new Date(message.createdAt)
                            let owner = false
                            if (message.from == userId) {
                                owner = true
                            }
                            return {
                                name: friendName,
                                content: message.content,
                                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                                owner: owner
                            }
                        })
                        resolve({
                            ...handleError(0),
                            data: data
                        })
                    } else {
                        resolve({
                            ...handleError(0),
                            data: []
                        })
                    }

                } else {
                    resolve(handleError(15))
                }
            } else {
                resolve(handleError(2))
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    findFriendByUserId, addFriendByUserId, rejectFriendByUserId,
    approveFriendByUserId, getCurrentUser, getContractListData,
    logoutAccount, updateAvatar, sendMessage, getMessageByConversationId
}
const User = require('../model/User')

const getUserAndFriendInfo = async (userId) => {
    try {
        let user = await User.findById(userId).populate('friends')
        return user
    } catch (error) {
        throw error
    }
}

const initializeSocket = (io) => {
    try {
        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('online', async (userId) => {
                if (userId) {
                    try {
                        let user = await getUserAndFriendInfo(userId)
                        if (user) {
                            user.socketId = socket.id
                            await user.save()
                            let friends = user.friends
                            if (friends && friends.length > 0) {
                                for (let friend of friends) {
                                    if (friend.socketId) {
                                        socket.to(friend.socketId).emit('updateFriendOnline', userId);
                                    }
                                }
                            }
                        }
                    } catch (error) {
                        throw error
                    }
                }
            })

            socket.on("disconnect", async () => {
                try {
                    let user = await User.findOne({ socketId: socket.id }).populate('friends')
                    if (user) {
                        let date = new Date()
                        user.socketId = ''
                        user.lastTimeOnline = date
                        await user.save()
                        let friends = user.friends
                        if (friends && friends.length > 0) {
                            for (let friend of friends) {
                                if (friend.socketId) {
                                    socket.to(friend.socketId).emit('updateFriendOffline', { userId: user._id, lastTimeOnline: date });
                                }
                            }
                        }
                    }
                } catch (error) {
                    throw error
                }
            });
            console.log("user disconnected");
        });
    } catch (error) {
        console.log("🚀 ~ file: socket.js:23 ~ initializeSocket ~ error:", error)
    }

}
module.exports = { initializeSocket }
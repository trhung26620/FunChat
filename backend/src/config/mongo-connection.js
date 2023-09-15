const mongoose = require("mongoose");
require('dotenv').config()
const User = require('../model/User')


const connectMongoDB = async () => {
    const mongooURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.wxs5n9c.mongodb.net/FunChat?retryWrites=true&w=majority`
    await mongoose.connect(mongooURL)
    //  await addUser()
}

const addUser = async () => {
    // const users = new User({
    //     name: "Zildjian",
    //     email: "abc123@gmail.com",
    //     password: "123456",
    //     otp: {
    //         code: "11111",
    //         expiry: new Date()
    //     }
    // })
    const data = await User.create({
        name: "Zildjian",
        email: "abc129@gmail.com",
        password: "123456",
        friends: ['642427528a671a86a36b880c'],
        conversations: ['642427528a671a86a36b8123'],
        otp: {
            code: "11111",
            expiry: new Date()
        }
    })

    // console.log("🚀 ~ file: mongo-connection.js:31 ~ addUser ~ data:", data)
    // await users.save().then(() => console.log("user saved"))
}

module.exports = connectMongoDB
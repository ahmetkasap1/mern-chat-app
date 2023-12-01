const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    message: [
        {
            senderUsername: String,
            messages: String
        }
    ],
    chatId : {type : [String]},

    userRef : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}

})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
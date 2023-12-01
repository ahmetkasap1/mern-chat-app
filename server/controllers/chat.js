const User = require('../models/User')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')
const Chat = require('../models/Chat')

const getChatScreen = async(req,res) => {

    if(!req.user) throw new APIError('yetkisiz işlem', 401) //*token control, mesajı gönderecek user

    const user = await User.find({username : req.params.username}) //* mesajı alacak user

    if(!user) throw new APIError('kullanıcı bulunamadı', 404) 
    else return new Response(user, 'kullanıcı bilgileri').success(res)

}
const sendMessage = async(req,res) => {  

   console.log(req.body)

    const user = await User.findOne({_id : req.user._id})
    if(!user) throw new APIError('yetkisiz işlem', 401) 


    const control = await Chat.findOne({$and : [{chatId : req.body.chatId[0]} , {chatId : req.body.chatId[1]}]  } )
    if(control) {
        const chat = await Chat.findOneAndUpdate(
            {
                chatId: req.body.chatId[0],
                chatId: req.body.chatId[1]
            },
            { $push: { message:  req.body.message  } },
            { new: true }
        )
        if(chat) return new Response(null, 'mesaj eklendi').success(res)
        else throw new APIError('mesaj eklenirken bir hata oldu', 500)  
    }
    else {
        const chat = new Chat({
            message : req.body.message,
            chatId : req.body.chatId ,
            userRef : req.user._id.toString()
        })
        const response = await chat.save()
        console.log(response)
    }
   
   
    
    
}

const getMessage = async (req,res) => {

    const user = await User.findOne({_id : req.user._id})
    if(!user) throw new APIError('yetkisiz işlem', 401)

    console.log(req.query)


    const chat = await Chat.findOne({$and : [{chatId : req.query.senderUsername} , {chatId : req.query.reciverUsername}]  } )
    if(!chat) throw new APIError('kaynak bulunamadı', 404)

    return new Response(chat, 'mesajlar').success(res)



} 



module.exports = {
    getChatScreen,sendMessage,getMessage
}
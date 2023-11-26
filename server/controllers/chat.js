const User = require('../models/User')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')

const getChatScreen = async(req,res) => {

    if(!req.user) throw new APIError('yetkisiz işlem', 401) //*token control, mesajı gönderecek user

    const user = await User.find({username : req.params.username}) //* mesajı alacak user

    if(!user) throw new APIError('kullanıcı bulunamadı', 404) 
    else return new Response(user, 'kullanıcı bilgileri').success(res)





}
const sendMessage = async(req,res) => {

}


module.exports = {
    getChatScreen,sendMessage
}
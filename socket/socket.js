const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)

io = socketio(server, {
    cors: {
        origin: "http://localhost:3000", // Kökeni uygun şekilde ayarlayın
        methods: ["GET", "POST"]
    }
})

let allOnlineUsers = []

io.on('connection', (socket) => {  //* socket sunucusuna connection isimli bir event gelirse socket ile yakala

    socket.on('onlineUsers', response => { 
            if(!allOnlineUsers.some((user) => user.receiverUsername ===response.receiverUsername)) {
                allOnlineUsers.push({receiverUsername : response.receiverUsername, socketId : response.socketId})
            } 
        io.emit('all-online-users', allOnlineUsers)
    })

    socket.on('message', data => {
        console.log("allOnlineUsersssss", allOnlineUsers)
        const user = allOnlineUsers.find((user) => user.receiverUsername === data.receiverUsername)
        console.log("reciverUser", user)

        if(user) {
           io.to(user.socketId).emit('recive-message',data)
           console.log(user.socketId)
        }

    })

    

    
})



server.listen(3001, () => {
    console.log("socket running...")
})

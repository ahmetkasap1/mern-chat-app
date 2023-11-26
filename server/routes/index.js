const express = require('express')
const router = express.Router()

const user = require('./user')
const chat = require('./chat')

router.use('/users', user)
router.use('/chat',chat)

module.exports = router



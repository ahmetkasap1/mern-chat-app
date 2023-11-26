const express = require('express')
const router = express.Router()
const {getChatScreen} = require('../controllers/chat')
const authMiddlewares = require('../middlewares/auth')

router.get('/:username', authMiddlewares.checkToken, getChatScreen)

module.exports = router
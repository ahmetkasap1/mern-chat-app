const express = require('express')
const router = express.Router()
const {getChatScreen, sendMessage, getMessage} = require('../controllers/chat')
const authMiddlewares = require('../middlewares/auth')


router.get('/:username', authMiddlewares.checkToken, getChatScreen)

router.post('/message', authMiddlewares.checkToken, sendMessage)
router.get('/message/m', authMiddlewares.checkToken, getMessage )


module.exports = router
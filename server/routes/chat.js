const express = require('express')
const router = express.Router()
const {getChatScreen, sendMessage, getMessage, getPersons} = require('../controllers/chat')
const authMiddlewares = require('../middlewares/auth')



router.get('/:username', authMiddlewares.checkToken, getChatScreen)

router.post('/message', authMiddlewares.checkToken, sendMessage)
router.get('/message/m', authMiddlewares.checkToken, getMessage )

router.get('/persons/:chatId', authMiddlewares.checkToken, getPersons)


module.exports = router
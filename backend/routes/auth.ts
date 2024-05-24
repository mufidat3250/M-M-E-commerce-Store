const router = require('express').Router()
const {upload}  = require('../multar')
const {createUser, login, activation} = require('../controllers/auth')

router.post('/register-user', upload.single('file'), createUser)
router.post('/activation', activation)
router.post('/login-user', login)

module.exports = router

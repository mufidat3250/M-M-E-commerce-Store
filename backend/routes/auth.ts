const router = require('express').Router()
const {upload}  = require('../multar')
const {createUser, login} = require('../controllers/auth')

router.post('/create-user', upload.single('file'), createUser)
router.post('/login', login)

module.exports = router

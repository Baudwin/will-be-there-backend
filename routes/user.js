const router = require('express').Router()
const {signin, register}  = require('../controllers/userController')
require('../strategies/JwtStrategy')

router.post("/signin", signin)
router.post("/register", register)

module.exports = router
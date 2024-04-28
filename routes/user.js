const router = require('express').Router()
const {signin,  register}  = require('../controllers/userController')
// require('../strategies/JwtStrategy')
// const authenticateJWT = require('../middleware/authenticateJwt')

router.post("/signin", signin)
router.post("/register", register)

module.exports = router
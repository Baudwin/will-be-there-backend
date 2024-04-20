const router = require('express').Router()
const {signin, protected}  = require('../controllers/userController')
require('../strategies/JwtStrategy')
const authenticateJWT = require('../middleware/authenticateJwt')

router.post("/signin", signin)

router.get('/protected',authenticateJWT , protected)

module.exports = router
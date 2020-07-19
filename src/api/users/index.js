const restifyRouter = require('restify-router')

const router = new restifyRouter.Router()
const passport = require('passport')

router.post('/', passport.authenticate('local-login'), (req, res, next) => {
  res.status(200).send('ss')
  next()
})

module.exports = router

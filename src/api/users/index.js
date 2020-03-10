const restifyRouter = require('restify-router');
const router = new restifyRouter.Router();
const passport = require('passport');
router.get('/', (req,res,next) {

  next();
})


module.exports = router;

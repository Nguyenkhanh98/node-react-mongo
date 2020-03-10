const restifyRouter = require('restify-router');
const router = new restifyRouter.Router();

router.get('/', (req,res,next) {

  next();
})


module.exports = router;

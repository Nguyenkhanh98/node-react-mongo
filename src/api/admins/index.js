const restifyRouter = require('restify-router');
const router = new restifyRouter.Router();

router.get('/', (req,res,next) {

  next();
})
router.get('/:name', (req,res,next) => {

  next();
})

module.exports = router;

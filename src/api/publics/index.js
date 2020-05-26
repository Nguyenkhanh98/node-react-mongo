const restifyRouter = require('restify-router');
const errors = require('restify-errors');
const log = require('../../loggers/bunyan');
const accountService = require('../../services/account');

const router = new restifyRouter.Router();

router.post('/signup', async (req, res, next) => {
  console.log(req.body);
  const response = await accountService.signUp(req.body);
  if (response) {
    res.send('sign up succeess');
  } else {
    return next(new errors.ForbiddenError());
  }
  next();
});


module.exports = router;

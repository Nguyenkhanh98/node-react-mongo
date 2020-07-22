const restifyRouter = require('restify-router');
const userService = require('../../../services/users');
const router = new restifyRouter.Router();
const passport = require('passport');
const LIMIT = 10;
const OFFSET = 0;



router.get('/:id', async (req, res, next) => {
	const { id } = req.params || '';
	if (!id) {
		res.send(422, { message: 'id is required' });
	}

    const user = await userService.getUserById(id);
    const { isSuccess, status, message, data} = user ;
		if (isSuccess) {
		return	res.send(status, { data, message });
		}
			res.send(status, { message}) ;
});

router.get('',passport.authenticate('jwt', {session: false}) , async (req, res, next) => {

	let { limit, offset } = req.query || '';

	limit = limit || LIMIT;
	offset = offset || OFFSET;

    const users = await userService.getListUser({ limit, offset });
    const { isSuccess, status, message, data} = users ;

		if (isSuccess) {
			return res.send(status, { data, message});
    }
		res.send(status, {message });

});

router.put('/:id',passport.authenticate('jwt', {session: false}), async (req, res, next) => {

	const { id } = req.params || '';
  const params = req.body || '';

	if (!id) {
		return res.send(422, { message: 'id is required' });
  }

  if (id !== req.user._id.toString()) {
    return res.send(401, {message: 'you dont have permission'});
  }

    const user = await userService.updateUserById(id, params);
    const { isSuccess, status, message, data } = user ;

    if (isSuccess) {
		 return	res.send(status, { data, message });
    }

    res.send(status, {  message });
});

router.del('/:id',passport.authenticate('jwt', {session: false}),  async (req, res, next) => {
	const { id } = req.params || '';
	if (!id) {
    return	res.send(422, { message: 'id is required' });
  }
  if (id !== req.user._id.toString()) {
    return res.send(401, {message: 'you dont have permission'});
  }

    const user = await userService.deleteUserById(id);
    const { isSuccess, status, message, data } = user ;

		if (isSuccess) {
		return	res.send(status,{ message });
    }
    return res.send(status, {message});
});

module.exports = router;

const restifyRouter = require('restify-router');
const posterService = require('../../../services/posters');
const router = new restifyRouter.Router();
const passport = require('passport');
const { default: response } = require('../../../configs/response');
const LIMIT = 10;
const OFFSET = 0;

router.post('', passport.authenticate('jwt', {session: false}) ,async (req, res, next) => {
  const params = req.body || '';

  const { title  } = params;
  if (!title) {
    return res.send(422, {message: 'title is required'});
  }

  const {_id} = req.user;
    params.user_id = _id;
    const createPoster = await posterService.create( params);

    let {  status, message, data } = createPoster ;
    isSuccess = createPoster.isSuccess;
    if (isSuccess) {
		 return	res.send(status, { data, message });
    }

    res.send(status, {  message });
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params || '';
	if (!id) {
		res.send(422, { message: 'id is required' });
	}

    const poster = await posterService.getPosterById(id);
    const { isSuccess, status, message, data} = poster ;
		if (isSuccess) {
		return	res.send(status, { data, message });
		}
			res.send(status, { message}) ;
});

router.get('' , async (req, res, next) => {

	let { limit, offset, user_id } = req.query || '';

	limit = limit || LIMIT;
	offset = offset || OFFSET;

    const posters = await posterService.getListPoster({ limit, offset, user_id });
    const { isSuccess, status, message, data} = posters ;

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
  const poster = await posterService.getPosterById(id);

  let { isSuccess,status, message, data} = poster;

  if ( !isSuccess) {
    return response(status, message);
  }

  if (data.user_id !== req.user._id) {
    return res.send(401, {message: 'you dont have permission'});
  }

    const updatePoster = await posterService.updatePosterById(id, params);

    isSuccess= updatePoster.isSuccess;
    message =updatePoster.message;
    data =updatePoster.data;
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
  const poster = await posterService.getPosterById(id);

  let { isSuccess,status, message, data} = poster;

  if ( !isSuccess) {
    return response(status, message);
  }

  if (req.user._id.toString() !== data.user_id.toString()) {
    return res.send(401, {message: 'you dont have permission'});
  }

    const deletePoster = await posterService.deletePosterById(id);
    isSuccess = deletePoster.isSuccess;
    status = deletePoster.status;
    message = deletePoster.message;
		if (isSuccess) {
		return	res.send(status,{ message });
    }
    return res.send(status, {message});
});

module.exports = router;


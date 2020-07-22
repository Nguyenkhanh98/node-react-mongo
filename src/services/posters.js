const PosterModel = require('../models/poster');
const logger = require('../loggers/winston');
const response = require('../configs/response');
const posterService = {};
const MAX_LIMIT = 30;

posterService.getPosterById = async (id) => {
	try {
		const poster = await PosterModel.findById(id).where({is_deleted:false});
		if (poster) {
     return response(true, 200, 'get poster successfully', poster) ;

    }
    return response(false, 404, 'poster is not exist') ;
	} catch (error) {
    logger.error(error);
    return response(false, 500, 'something unknown occurred') ;
	}
};

posterService.create = async (data) => {
	const { title, user_id } = data;
  const description = data.description || '';
	try {
		const poster = await PosterModel.create({ title, description, user_id });
		if (poster) {
      return response(true, 201, 'create poster successfully', poster) ;
    }
    return response(false, 500, 'something unknown occurred') ;

	} catch (error) {
		logger.error(error);
    return response(false, 500, 'something unknown occurred') ;

	}
};

posterService.getListPoster = async ({ limit, offset, user_id }) => {
  const condition = user_id? { user_id } : {};
	limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;
	try {
		let listPoster;
      listPoster = await PosterModel.find(condition).where({is_deleted:false}).skip(offset).limit(limit);
      return response(true, 200, 'get list posters successfully', listPoster) ;
	} catch (error) {
    logger.error(error);
    return response(false, 500, 'something unknown occurred') ;

	}
};

posterService.deletePosterById =async (id) => {
  try {
    const poster = await PosterModel.findById(id);
    if (!poster) {
      return response(false, 404, 'poster is not exist');
    }
    poster.is_deleted = true ;
    await poster.save();
    return response(true, 200, 'delete successfully' ) ;
  } catch (error) {
    return response(false, 500, 'something unknown occurred');
  }
};

module.exports = posterService;

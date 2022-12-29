const { getTvShow, getTvShowDetails } = require('../services/tvshow.service');

exports.getTvShow = async (req, res, next) => {
  try {
    const tvshow = await getTvShow();
    res.send(tvshow);
  } catch (e) {
    next(e);
  }
};

exports.getTvShowDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tvshowDetails = await getTvShowDetails(id);
    res.send(tvshowDetails);
  } catch (e) {
    next(e);
  }
};

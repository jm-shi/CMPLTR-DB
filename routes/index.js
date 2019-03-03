let communityFeed = require('../communityFeed.json');

/*
 * GET home page.
 */

exports.view = function (req, res) {
  if (req.session) {
    console.log(req.session);
  }
  res.render('index', {
    communityFeed
  });
};

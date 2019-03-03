let communityFeed = require('../communityFeed.json');

/*
 * GET home page.
 */

exports.view = function (req, res) {
  res.render('index', {
    communityFeed
  });
};

let communityFeed = require('../communityFeed.json');

/*
 * GET home page.
 */

exports.view = function (req, res) {
  if (req.session) {
    console.log(req.session);
  }
  if (req.session && req.session._id) {
    res.render('index', {
      communityFeed,
      userSignedIn: true
    });
  } else {
    res.render('index', {
      communityFeed
    });
  }
};

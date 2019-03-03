let communityFeed = require('../communityFeed.json');

/*
 * GET home page.
 */

exports.view = function (req, res) {
  if (req.session) {
    console.log(req.session);
  }
  if (req.session && req.session.first_name) {
    res.render('index', {
      communityFeed,
      firstName: req.session.first_name,
      userSignedIn: true
    });
  } else {
    res.render('index', {
      communityFeed
    });
  }
};

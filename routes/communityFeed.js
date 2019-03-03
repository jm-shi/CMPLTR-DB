let communityFeed = require('../communityFeed.json');

/*
 * GET community feed page.
 */
exports.view = function (req, res) {
  if (req.session && req.session.first_name) {
    res.render('communityFeed', {
      navbarTitle: 'Community Feed',
      userSignedIn: true,
      firstName: req.session.first_name,
      communityFeed
    });
  } else {
    res.render('communityFeed', {
      navbarTitle: 'Community Feed',
      communityFeed
    });
  }
};

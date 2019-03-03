let communityFeed = require('../communityFeed.json');

/*
 * GET community feed page.
 */
exports.view = function (req, res) {
  if (req.session && req.session._id) {
    res.render('communityFeed', {
      navbarTitle: 'Community Feed',
      userSignedIn: true,
      communityFeed
    });
  } else {
    res.render('communityFeed', {
      navbarTitle: 'Community Feed',
      communityFeed
    });
  }
};

exports.add = function (req, res) {
  const id = req.params.id;
  const name = req.params.name;
  const completedDayNumber = req.params.completedDayNumber;
  const routineName = req.params.routineName;

};
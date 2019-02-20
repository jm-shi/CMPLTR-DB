let communityFeed = require('../communityFeed.json');

/*
 * GET community feed page.
 */
exports.view = function (req, res) {
  res.render('communityFeed', {
    navbarTitle: 'Community Feed',
    communityFeed
  }); 
};

exports.add = function (req, res) {
  const id = req.params.id;
  const name = req.params.name;
  const completedDayNumber = req.params.completedDayNumber;
  const routineName = req.params.routineName;
  
};
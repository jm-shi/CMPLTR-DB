/*
 * GET community feed page.
 */

exports.view = function (req, res) {
  res.render('communityFeed', {
    navbarTitle: 'Community Feed'
  });
};
/*
 * GET help page.
 */

exports.view = function (req, res) {
  res.render('help', {
    navbarTitle: 'Help'
  });

  if (req.session && req.session._id) {
    res.render('help', {
      navbarTitle: 'Help',
      userSignedIn: true
    });
  } else {
    res.render('help', {
      navbarTitle: 'Help'
    });
  }
};
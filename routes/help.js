/*
 * GET help page.
 */

exports.view = function (req, res) {
  res.render('help', {
    navbarTitle: 'Help'
  });

  if (req.session && req.session.first_name) {
    res.render('help', {
      navbarTitle: 'Help',
      firstName: req.session.first_name,
      userSignedIn: true
    });
  } else {
    res.render('help', {
      navbarTitle: 'Help'
    });
  }
};

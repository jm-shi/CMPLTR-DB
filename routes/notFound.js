/*
 * GET 404 not found page.
 */

exports.view = function (req, res) {
  if (req.session && req.session._first_name) {
    res.render('notFound', {
      firstName: req.session.first_name,
      userSignedIn: true
    });
  } else {
    res.render('notFound');
  }
};
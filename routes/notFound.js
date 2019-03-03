/*
 * GET 404 not found page.
 */

exports.view = function (req, res) {
  if (req.session && req.session._id) {
    res.render('notFound', {
      userSignedIn: true
    });
  } else {
    res.render('notFound');
  }
};
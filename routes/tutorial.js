/*
 * GET tutorial page.
 */

exports.view = function (req, res) {
    res.render('tutorial', {navbarTitle: 'Tutorial'});
};
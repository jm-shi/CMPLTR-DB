// /*
//  * GET login page.
//  */

exports.view = function (req, res) {
  console.log("Inside login function");
  res.render('login', {
    navbarTitle: 'Login'
  });
};

// $(document).ready(function() {
//   $('#username').focus();

//   $('.login').click(function() {

//       event.preventDefault(); // prevent PageReLoad

//      var ValidEmail = $('#exampleInputEmail1').val() === 'invitado'; // User validate
//     var ValidPassword = $('#exampleInputPassword1').val() === 'hgm2015'; // Password validate

//       if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
//           $('.valid').css('display', 'block');
//           window.location = "/"; // go to home.html
//       }
//       else {
//           $('.error').css('display', 'block'); // show error msg
//       }
//   });
// });
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    // const userId = response.authResponse.userID;
    // const accessToken = response.authResponse.accessToken;
    setUserInfo();
  }
}

function setUserInfo() {
  FB.api('/me?fields=name,first_name,email,picture.width(100)', function (response) {
    if (response && !response.error) {
      window.localStorage.setItem('id', response.id);
      window.localStorage.setItem('name', response.name);
      window.localStorage.setItem('first_name', response.first_name);
      window.localStorage.setItem('email', response.email);
      window.localStorage.setItem('picture', response.picture.data.url);
      window.location.href = "/home";
    }
  });
}

// function fetchUserInfo() {
//   const userObj = new Object();
//   const localStorage = window.localStorage;
//   userObj.id = localStorage.getItem('id');
//   userObj.name = localStorage.getItem('name');
//   userObj.first_name = localStorage.getItem('first_name');
//   userObj.email = localStorage.getItem('email');
//   userObj.picture = localStorage.getItem('picture');
//   return userObj;
// }

function logoutFacebook() {
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.logout(function (res) {
        window.localStorage.clear();
        window.location.href = "/login";
      });
    }
  });
}
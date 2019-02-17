function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('Facebook login status changed.');
  if (response.status === 'connected') {
    console.log('Successfully logged in with Facebook');
    // const userId = response.authResponse.userID;
    // const accessToken = response.authResponse.accessToken;
    fetchUserInfo();
    // $.get(`https://graph.facebook.com${userId}?access_token=${accessToken}&fields=email,name,picture`);
    // FB.api('/me?fields=name,first_name,picture.width(480)');
  }
}

function fetchUserInfo() {
  FB.api('/me?fields=name,first_name,email,picture.width(100)', function (response) {
    if (response && !response.error) {
      window.localStorage.setItem('id', response.id);
      window.localStorage.setItem('name', response.name);
      window.localStorage.setItem('first_name', response.first_name);
      window.localStorage.setItem('email', response.email);
      window.localStorage.setItem('picture', response.picture.data.url);
    }
  });
}

function logoutFacebook() {
  FB.logout(function (response) {
    console.log('Logged out of Facebook', response);
    window.localStorage.clear();
  })
}
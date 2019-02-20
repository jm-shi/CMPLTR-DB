function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    setUserInfo();
  }
}

function setUserInfo() {
  FB.api('/me?fields=name,first_name,email,picture.width(300)', function (response) {
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

function logout() {
  window.localStorage.clear();
  window.location.href = "/login";
  /*
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.logout(function (res) {
        window.localStorage.clear();
        window.location.href = "/login";
      });
    } else {
      window.location.href = "/login";
    }
  });
  */
}
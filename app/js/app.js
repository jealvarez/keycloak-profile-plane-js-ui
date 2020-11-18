var keycloak = new Keycloak({
  url: 'http://192.168.99.1:9000/auth/',
  realm: 'jconf2020',
  clientId: 'keycloak-profile-plane-js-ui',
});

window.onload = function () {
  keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: true,
      checkLoginIframeInterval: 1
    })
    .then(function () {
      if (keycloak.authenticated) {
        displayProfile();
        toogleSecureMenu(true)
        toogleInsecureMenu(false);
      } else {
        toogleSecureMenu(false)
        toogleInsecureMenu(true);
      }
    }).catch(function () {
      alert("Failed to initialize Keycloak SSO");
    });;
};

function signOut() {
  docCookies.removeItem('KEYCLOAK_NETCORE_SESSION', '/');
  docCookies.removeItem('KEYCLOAK_NETCORE_SESSIONC1', '/');
  docCookies.removeItem('KEYCLOAK_NETCORE_SESSIONC2', '/');
  keycloak.logout({
    redirectUri: 'http://192.168.99.1:5300'
  });
}

function displayProfile() {
  if (keycloak.tokenParsed['given_name']) {
    document.getElementById('firstName').innerHTML = keycloak.tokenParsed['given_name'];
  }
  if (keycloak.tokenParsed['family_name']) {
    document.getElementById('lastName').innerHTML = keycloak.tokenParsed['family_name'];
  }
  if (keycloak.tokenParsed['preferred_username']) {
    document.getElementById('username').innerHTML = keycloak.tokenParsed['preferred_username'];
  }
  if (keycloak.tokenParsed['email']) {
    document.getElementById('email').innerHTML = keycloak.tokenParsed['email'];
  }

  display('profile');
}

function displayToken() {
  document.getElementById('token-content').innerHTML = JSON.stringify(keycloak.tokenParsed, null, '    ');
  display('token');
}

function displayIdToken() {
  document.getElementById('id-token-content').innerHTML = JSON.stringify(keycloak.idTokenParsed, null, '    ');
  display('idToken');
}

function display(id) {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('profile').style.display = 'none';
  document.getElementById('token').style.display = 'none';
  document.getElementById('idToken').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

function hide(id, remove) {
  if (remove) {
    document.getElementById(id).classList.remove("hide");
  } else {
    document.getElementById(id).classList.add("hide");
  }
}

function toogleSecureMenu(show) {
  hide("account-menu-item", show);
  hide("token-menu-item", show);
}

function toogleInsecureMenu(show) {
  hide("signin-menu-item", show);
}

function postLogout() {
  toogleSecureMenu(false);
  toogleInsecureMenu(true);
}

keycloak.onAuthLogout = postLogout;

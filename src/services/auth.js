const baseURL = 'https://job-application-tracker.azurewebsites.net/api/auth';
// const baseURL = 'http://localhost:3000/api/auth';

export async function register(newUser) {
    const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then((response) => response.json())
    return response;
}

export async function login(user) {
    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))

    return response;
}

// get token and userId from cookie
export async function getTokenAndUserId() {
    var searchToken = "token";
    var searchUserId = "userId";
    var token = "";
    var userId = "";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(searchToken) === 0) {
        token = c.substring(searchToken.length + 1);
      }
      if (c.indexOf(searchUserId) === 0) {
        userId = c.substring(searchUserId.length + 1);
      }
    }
    return ({token, userId});
}

// clear cookie and local storage
export async function logout() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  localStorage.removeItem("jobs");
}
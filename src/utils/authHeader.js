export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return {
      'Accept': 'application/json',
      'Authorization': 'JWT ' + token,
      "Content-Type": "application/json; charset=utf-8",
    };
  } else {
    return {
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8",
    };
  }
}

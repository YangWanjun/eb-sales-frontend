export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return {
      'Accept': 'application/json',
      'Authorization': 'JWT ' + token,
    };
  } else {
    return { 'Accept': 'application/json', };
  }
}

function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene l'invio del form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://casasmart.me/dologin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'username': username,
            'password': password
        })
    })
    .then(response => {
        if (response.status === 200) {
            document.cookie = "user=" + username + "; path=/";
            window.location.href = '/?version=1';
        } else {
            throw new Error('Unauthorized');
        }
    })
    .then(data => {
        console.log(data);
        if (!getCookie('user')) {
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

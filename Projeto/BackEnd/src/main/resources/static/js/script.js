function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    const decodedToken = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

function validateAndRedirect() {
    const token = sessionStorage.getItem('token');

    if (token) {
        if (!isTokenExpired(token)) {
            fetch('/validate-token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        sessionStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                })
                .catch(error => {
                    console.error('Erro ao validar token no backend:', error);
                    sessionStorage.removeItem('token');
                    window.location.href = '/login';
                });
        } else {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
    } else {
        window.location.href = '/login';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    validateAndRedirect();
});
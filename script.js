function decodeJwt(token) {
    const base64Url = token.split('.')[1]; // Obtiene la parte del payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres para decodificar
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload); // Convierte el JSON a un objeto
}

document.getElementById('decodeJwt').addEventListener('click', () => {
    const jwtInput = document.getElementById('jwtInput').value;
    try {
        const decoded = decodeJwt(jwtInput);
        document.getElementById('decodedResult').innerText = JSON.stringify(decoded, null, 2);
    } catch (error) {
        document.getElementById('decodedResult').innerText = 'Error: ' + error.message;
    }
});
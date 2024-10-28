document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("ERROR: Debe ingresar un nombre de usuario y una contraseña.");
        return;
    }

    const formData = {
        username: username,
        password: password
    };

    const response = await fetch(`/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("¡Inicio de sesión exitoso! Bienvenido, " + data.user.username);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "/"; 
    } else if (response.status === 404) {
        const error = await response.json();
        alert(error.error);
    } else if (response.status === 400) {
        const error = await response.json();
        alert(error.error);
    } else {
        alert("Ocurrió un error. Por favor, intenta nuevamente.");
    }
});
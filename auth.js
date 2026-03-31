// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;

        localStorage.setItem("user", JSON.stringify({ username, password }));

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && username === storedUser.username && password === storedUser.password) {
            localStorage.setItem("loggedIn", true);
            window.location.href = "index.html";
        } else {
            alert("Invalid login details");
        }
    });
}

// PROTECT INDEX PAGE
if (window.location.pathname.includes("index.html")) {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
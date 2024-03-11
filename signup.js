document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const signupBtn = document.getElementById("signupBtn");
    const messageBox = document.getElementById("messageBox");
    const message = document.getElementById("message");

    signupBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const email = document.getElementById("email").value;

        let errorMessage = "";

        if (!username.match(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/)) {
            errorMessage += "Invalid username. ";
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'\",.<>?\/`~])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'\",.<>?\/`~]{8,}$/)) {
            errorMessage += "Invalid password. ";
        }
        if (password !== confirmPassword) {
            errorMessage += "Passwords do not match. ";
        }
        if (!email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            errorMessage += "Invalid email address. ";
        }

        if (errorMessage === "") {
            message.textContent = "Signup successful!";
            messageBox.style.backgroundColor = "#5cb85c"; // Success color
        } else {
            message.textContent = errorMessage;
            messageBox.style.backgroundColor = "#d9534f"; // Error color
        }
    });
});

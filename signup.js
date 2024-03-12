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

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login-btn");
    const messageBox = document.getElementById("messageBox");
    const message = document.getElementById("message");

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the entered username and password
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Make an API call to fetch user data
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then(users => {
                // Extract the "name" and "email" properties from each user object
                const userData = users.map(user => ({ name: user.name, email: user.email }));

                // Validate the entered username and password
                const isValidLogin = userData.some(user => user.name === username && user.email === password);

                // Display appropriate message based on validation result
                if (isValidLogin) {
                    showMessage("Login successful!", "#5cb85c"); // Success color
                } else {
                    showMessage("Invalid username or password", "#d9534f"); // Error color
                }
            })
            .catch(error => {
                alert("Failed to fetch user data. Please try again later.");
                console.error("Error:", error);
            });
    });

    // Function to display a message in the message box
    function showMessage(msg, color) {
        message.textContent = msg;
        messageBox.style.backgroundColor = color;
    }
});

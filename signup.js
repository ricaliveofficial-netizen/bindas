// ===============================
// SIGNUP SCRIPT (signup.js)
// ===============================

// >>> YOUR API URL <<<
const API_URL = "https://your-server.com/api/signup";  
// Eg: http://192.168.0.100:5000/api/signup

// Function to generate auto user ID (client side backup)
function generateUserID() {
    return "USR" + Math.floor(100000 + Math.random() * 900000);
}

document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form fields
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;

    // Auto-generated User ID
    const userID = generateUserID();

    // Build data object
    const userData = {
        name,
        number,
        email,
        country,
        gender,
        password,
        userID
    };

    try {
        // Send data to MongoDB via API
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (data.success) {
            // Save user data in localStorage
            localStorage.setItem("userName", name);
            localStorage.setItem("userID", userID);
            localStorage.setItem("userBalance", 0); // Default balance 0

            // Redirect to home page
            window.location.href = "home.html";
        } else {
            alert("Signup failed: " + data.message);
        }

    } catch (err) {
        console.log("Error:", err);
        alert("Server error! Please try again.");
    }
});
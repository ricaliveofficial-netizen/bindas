// Check if user is logged in by checking localStorage
function checkUserLogin() {
    // Get user data from localStorage
    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('userID');
    const userBalance = localStorage.getItem('userBalance');

    // If user data exists, display it on the page
    if (userName && userID && userBalance) {
        // Set user info in the header
        document.getElementById('userName').innerText = userName;
        document.getElementById('userId').innerText = "ID: " + userID;

        // Balance text update (only number part)
        document.querySelector('#userBalance span').innerText = "$" + userBalance;

    } else {
        // If no user data → redirect to login page
        window.location.href = "login.html";
    }
}

// Auto run on page load
window.onload = checkUserLogin;


// Update Balance Function
function updateBalance(amount) {
    let currentBalance = parseFloat(localStorage.getItem('userBalance')) || 0;
    currentBalance += amount;

    // Save new balance
    localStorage.setItem('userBalance', currentBalance);

    // Update in UI
    document.querySelector('#userBalance span').innerText = "$" + currentBalance;
}



// ------------------------------
// IMAGE SLIDER
// ------------------------------

let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll(".slide");

    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

showSlides();
// ভিডিও শেষ হলে অথবা ৫ সেকেন্ড পর লগইন পেজে রিডাইরেক্ট করা হবে
document.getElementById('splash-video').onended = function() {
    redirectToLogin();
};

// ৫ সেকেন্ড পর লগইন পেজে রিডাইরেক্ট করতে setTimeout ব্যবহার করা
setTimeout(redirectToLogin, 10000);

function redirectToLogin() {
    // লগইন পেজে রিডাইরেক্ট
    window.location.href = "login.html";
}
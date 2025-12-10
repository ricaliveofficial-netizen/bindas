
// লোডিং বার
let loader = document.getElementById('loader-bar');
let width = 0;
let duration = 5000; // 5 সেকেন্ড
let intervalTime = duration / 100;

let loading = setInterval(() => {
    if (width >= 100) {
        clearInterval(loading);
    } else {
        width += 1;
        loader.style.width = width + "%";
    }
}, intervalTime);

// 5 সেকেন্ড পরে gredy.html এ রিডাইরেক্ট
setTimeout(() => {
    window.location.href = "gredy.html";
}, 5000);

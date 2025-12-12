const socket = io();
let username = "";

// Modal ve input elementleri
const modal = document.getElementById("usernameModal");
const usernameInput = document.getElementById("usernameInput");
const usernameBtn = document.getElementById("usernameBtn");

usernameBtn.addEventListener("click", () => {
    const value = usernameInput.value.trim();
    if(!value) return alert("Kullanıcı adı boş olamaz!");
    username = value;
    modal.style.display = "none"; // Modal kapanır
});

// Form submit
const form = document.querySelector("form");
const input = document.querySelector("#m");
const messages = document.querySelector("#messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!input.value || !username) return;

    const msg = {
        name: username,
        text: input.value,
        timestamp: new Date().toLocaleTimeString()
    };

    socket.emit("chat message", msg);
    input.value = "";
});

// Mesajları alma ve ekrana yazma
socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${msg.name} [${msg.timestamp}]:</strong> ${msg.text}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});

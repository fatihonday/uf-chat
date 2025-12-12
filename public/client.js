const socket = io();

// Kullanıcı adı popup
let username = "";
while(!username) {
    username = prompt("Kullanıcı adınızı girin:");
    if(!username) alert("Kullanıcı adı boş olamaz!");
}

// Form submit
const form = document.querySelector("form");
const input = document.querySelector("#m");
const messages = document.querySelector("#messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!input.value) return;

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

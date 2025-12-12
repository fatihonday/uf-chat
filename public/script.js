const socket = io();

let username = "";

// Kullanıcı adı popup
// Modal elemanları
const usernameModal = document.getElementById("usernameModal");
const usernameInput = document.getElementById("usernameInput");
const usernameBtn = document.getElementById("usernameBtn");

// Kullanıcı adı modal işlemi
usernameBtn.addEventListener("click", () => {
    if (usernameInput.value.trim() === "") {
        alert("Lütfen bir kullanıcı adı girin.");
        return;
    }
    username = usernameInput.value.trim();
    usernameModal.style.display = "none"; // modalı kapat
});

// DOM elemanları
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Mesajı ekrana yazdırma fonksiyonu
function addMessage(data) {
    const li = document.createElement("li");

    const isMe = data.username === username;

    li.classList.add("message");
    li.classList.add(isMe ? "me" : "other");

    li.innerHTML = `
        <span class="username">${data.username}</span><br>
        ${data.text}
        <span class="time">${data.time}</span>
    `;

    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
}

// Eski mesajlar geldiğinde
socket.on("oldMessages", (msgs) => {
    msgs.forEach(m => addMessage(m));
});

// Yeni mesaj geldiğinde
socket.on("chatMessage", (msg) => {
    addMessage(msg);
});

// Mesaj gönderme
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    const now = new Date();
    const time = now.toLocaleString();

    const messageData = {
        username,
        text: input.value,
        time
    };

    socket.emit("chatMessage", messageData);
    input.value = "";
});

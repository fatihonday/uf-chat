const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let messages = []; // mesajları hafızada tutuyoruz

io.on("connection", (socket) => {
    console.log("Bir kullanıcı bağlandı");

    // Eski mesajları gönder
    socket.emit("oldMessages", messages);

    // Yeni mesaj geldiğinde
    socket.on("chatMessage", (msg) => {
        messages.push(msg); // mesajı kaydet
        io.emit("chatMessage", msg); // herkese gönder
    });

    socket.on("disconnect", () => {
        console.log("Bir kullanıcı ayrıldı");
    });
});

http.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

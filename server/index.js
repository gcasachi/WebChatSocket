const express = require("express");
const socketio = require("socket.io"); //Import do socket
const http = require("http");

const { addUser, removeUser, getUser, getUsersInSala } = require("./users.js");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);

//Socket
//const io = socketio(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "*", //https://socket.io/docs/v3/handling-cors/
  }
});

io.on("connection", (socket) => {
  //Este (socket) estará conectando com o client
  //emit - envia o dado para o client
  //on - espera um dado do client
  //join - adiciona um usuario a sala do socket atual.

  socket.on("join", ({ nome, sala }, callback) => {
    const { error, user } = addUser({ id: socket.id, nome, sala });

    if (error) return callback(error);

    //Envia a mesagem de 'bem vindo' ao entrar na sala 
    socket.emit("message", {
      user: "admin",
      text: `${user.nome}, bem vindo a sala ${user.sala}`,
    });  

    //Envia a mensagem pra todos os usuarios da sala
    socket.broadcast.to(user.sala).emit('message', {user: 'admin', text: `${user.nome}, entrou na sala!`})

    socket.join(user.sala); //Adiciona o usuario a uma sala
    
    io.to(user.sala).emit('usuarioSala', { sala: user.sala, users: getUsersInSala(user.sala) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.sala).emit('message', { user: user.nome, text: message });
    io.to(user.sala).emit('usuarioSala', { sala: user.sala, users: getUsersInSala(user.sala) });

    callback();
  });


  socket.on("disconnect", () => {
    //Quando entrar no socket ele disconecta e o usuario sai
    const user = removeUser(socket.id);

    if(user){
      io.to(user.sala).emit('message', {user: 'admin', text: `${user.nome}, saiu na sala!`})
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server iniciou na porta ${PORT}`));

const express = require('express');   //MODULO EXPRESS
const http = require("http");         //MODULO HTTP
const  socketio = require('socket.io');  //MODULO SOCKET IO


const app = new express();   //INICIALIZACION express
const server = http.Server(app);  //Creacion de server
const io = socketio(server,{
    cors: {
      origin: '*',
    }});      //Objeto socket que estara asociado y a la escucha en ese server

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.static('client'));




//rutas y controladores

app.use("/",(request,response)=>{
    response.send("HOLA");
})



//Evento CUANDO UN USUARIO o un nodo se conecte a nuestro server
io.on('connection', function(socket,payload) {     
    console.log("Nueva conexion , ID connection: " + socket.id);
    


    socket.on('send_new_message',function(payload){
        
        //Le enviamos json con el emisor de el mensaje y el contenido de el mensaje
        data = {
            emisor: socket.id,
            nickname: payload.nickname,
            message: payload.message
        }

        
        io.emit("new_messages", data);   //Server socket emit to all clients connected 
 
    });

    let handshake = socket.handshake;    //Informacion de el cliente conectado como ip ,hora ,url,host

});





 
server.listen(3000,function(){
    console.log("SERVER!!")
});
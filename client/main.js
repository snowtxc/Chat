var socket = io.connect('http://localhost:3000',{'forceNew': true});

window.addEventListener('load',function(){
    var nickname = prompt("Ingresa tu nickname");



    //Propiedades  
  
    var button = document.getElementById('button');
    var messagesBox = document.getElementById('newMessages');

  

    //Sockets events
    
    socket.on('connect', function(data) {
        
        socket.emit('join', 'Hello World from client');     //CLIENT to server 
    
    });


    socket.on('new_messages',function(data){
    
    
        if(data.emisor == socket.id){    //Si el emisor de el mensaje entrante es el propio cliente
            addMessageSender(data);

        }else if(data.emisor != socket.id){
            addOtherMessage(data);
        }
    
    })

   




    //Events
    
    button.addEventListener('click',() => {
        let payload = {
            nickname: nickname,
            message: document.getElementById('msj').value
        }
        socket.emit('send_new_message',payload);
    })

  



    //Funciones

    function addMessageSender(data){
        let elementDiv = document.createElement('div');

        elementDiv.classList.add("messages");
        elementDiv.classList.add("you_message");

        let nicknameStrong = document.createElement('strong');
        nicknameStrong.innerHTML = data.nickname;
        
        let messageParrafo = document.createElement('p');
        messageParrafo.innerHTML = data.message;

        elementDiv.append(nicknameStrong);
        elementDiv.append(messageParrafo);

        messagesBox.append(elementDiv);
        
    }


    function addOtherMessage(data){
        let elementDiv = document.createElement('div');

        elementDiv.classList.add("messages");
        elementDiv.classList.add("other_message");

        let nicknameStrong = document.createElement('strong');
        nicknameStrong.innerHTML = data.nickname;
        
        let messageParrafo = document.createElement('p');
        messageParrafo.innerHTML = data.message;

        elementDiv.append(nicknameStrong);
        elementDiv.append(messageParrafo);

        messagesBox.append(elementDiv);
        
    }



   
})


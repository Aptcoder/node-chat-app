console.log("I work")
let socket = io();

socket.on('connect' ,() => {
    console.log('Connected to server');

})

socket.on('disconnect',() => {
    console.log('Disconnected from Server')
})

socket.on("newMessage",function(message){
    console.log(message)
    let li = `<li>${message.from} : ${message.text}</li>`
    $('#messages').append(li);
});

$('#message-form').on('submit',function(e){
    e.preventDefault();
    let input = $("input[name='message'").val();
    socket.emit("createMessage",{
        from : "User",
        text : input
    },function(){
        console.log("Got It")
    })
})

socket.on("newLocationMessage",function(message){
    let li = $('<li></li>');
    let a = $("<a target='_blank'>My current location</a>")

    li.text(`${message.from} :`);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
})


let locationButton = $('#send-location');
locationButton.on('click',function(){
    console.log('I wrong')
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit("createLocationMessage",{
            longitude : position.coords.longitude,
            latitude : position.coords.latitude
        })
    },function(err){
        console.log(err)
        alert("Unable to fetch location!")
    });
})
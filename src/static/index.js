const socket = io("/")
// socket.on("hello", () => console.log("somebody joined"))

function sendMessage(message){
    socket.emit("newMessage", {message})
}

function handleMessageNotify(data){
    const {message, name} = data
    console.log(`${name} said:  ${message}`)
}

function setName(name){
    socket.emit("setName", {name})
}

socket.on("messageNotify", handleMessageNotify)
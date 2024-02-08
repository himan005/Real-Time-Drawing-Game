import express from 'express';
import path from 'path';
import logger from 'morgan'
import { fileURLToPath } from 'url';
import {Server as socketIO} from 'socket.io';

const PORT = 4000
const app = express()

app.set("view engine", "pug")

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('views',path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'static')))
app.use(logger("dev"))

app.get('/', (req, res)=> res.render('home'))

const handleListener = () => console.log(`Server running : http://localhost:${4000}`)

const server = app.listen(PORT, handleListener)

const io = new socketIO(server)

io.on("connection", socket => {
    socket.on("newMessage", ({message})=> {
        socket.broadcast.emit("messageNotify", {
            message,
            name:socket.name || "Anon"
        })
    }) 
    socket.on("setName", ({name}) =>{
        socket.name = name
    })
})
 


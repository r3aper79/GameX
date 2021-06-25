require('dotenv').config()
const express =require('express')
const cors = require ('cors')
const router = require('./routes/index')
require('./config/database')
const passport = require('passport')
require('./config/passport')
const fileUpload = require('express-fileupload')
const path = require('path')
// const socket = require('socket.io')

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static('assets'))

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT 

// const server =
app.listen(port, host, () => console.log("App listening on port "+port+" on "+host))

// const io = socket(server,{cors:{origin:'*'}})

// io.on('connection',(socket)=>{
//     console.log("Entró una nueva conexión")
//         socket.on('messageSent',()=>{
//             console.log("enviando rerenderizado")
//             io.sockets.emit('reloadMessages')
//         })
//         socket.on('reloadFriendList',()=>{
//             console.log("recargando amigos")
//             io.sockets.emit('reloadFriendLists')
//         })
// })
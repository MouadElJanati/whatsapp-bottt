const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
var cors = require('cors');
var path = require('path');

// app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        credentials: true
    }
});

const whatsapp = require('./src/whats-app');
// var youtube = require('./search/index');
app.get('/whatsapp/register', whatsapp.register);
app.use(express.static(`./public`));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + `./public/index.html`));
});
// io.on('connection', (socket) => {
//     socket.emit("welcome", 'docId');
//     // socket.broadcast.emit('welcome', 'docId')
//     // socket.on("getDoc", docId => {
//     //     //  safeJoin(docId);

//     // });
// });
// app.post('/whatsapp/sendmessage', whatsapp.sendMessage);
// app.use('/search', youtube);

// app.post('/whatsapp/recibe', whatsapp.recibeMessage);
whatsapp.conectApi()
    // whatsapp.recibeMessage()
http.listen(3001, () => {
    console.log('conectado')
})
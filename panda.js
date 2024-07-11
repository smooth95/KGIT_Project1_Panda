const express = require("express");

const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

const session = require("express-session");

const app = express();


const server = http.createServer(app);
const io = socketIO(server);


app.use("/resources", express.static("./resources"))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/resources'));

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( cookieParser() );


require("./src/chat/chat")(io)
const router = require("./router")(app);

app.set("views", "./src/views")
app.set("view engine", "ejs")

//3000번 포트로 서버 구동
server.listen(3000, () => {
    console.log("3000서버 구동")
})


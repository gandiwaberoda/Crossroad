// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let clients = {};
let server;

const WebSocketServer = window.require('websocket').server;
const http = require('http');

const btnStart = document.getElementById("btnStart")
const portInput = document.getElementById("portInput")

btnStart.addEventListener('click', function (e) {
    if (server) {
        // Stop
        console.log("Stopping server");
        for (const [key, socket] of Object.entries(clients)) {
            socket.close();
            delete clients[key];
        }
        server.close();
        clients = {}
        server = null;
        btnStart.classList.remove("bg-danger");
        portInput.disabled = false;
        btnStart.innerText = "Start";
    } else {
        console.log("Starting server");
        // Start
        server = http.createServer(function (request, response) {
            // process HTTP request. Since we're writing just WebSockets
            // server we don't have to implement anything.
        });

        server.listen(Number.parseInt(portInput.value), function () {
            wsServer = new WebSocketServer({
                httpServer: server
            });

            let clientKey = 0;
            console.log("entah");

            // WebSocket server
            wsServer.on('request', function (request) {
                let connection = request.accept(null, request.origin);

                clientKey++;
                const myConnectionKey = clientKey;
                clients[myConnectionKey] = connection;

                connection.on('message', function (message) {
                    if (message.type === 'binary') {
                        // Berupa binary, parse sebagai json
                        // Anggap merupakan Intercom
                        const decoded = JSON.parse(message.binaryData);
                        // console.log(decoded);
                    } else {
                        // Berupa text biasa, dikirim via Websocket Client biasa
                        console.log(message);
                        console.log(clients);
                    }
                });

                connection.on('close', function (con) {
                    // close user connection
                    delete clients[myConnectionKey];
                });
            });

            btnStart.innerText = "Stop";
            btnStart.classList.add("bg-danger");
            portInput.disabled = true;
        });
        server.once("error", function (err) {
            console.error(err);
            alert("Tidak bisa membuka server (Buka devconsole untuk pesan error):")
        })
    }
})
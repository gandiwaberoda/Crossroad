// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let server;
let clientKey = 0;

const WebSocketServer = window.require('websocket').server;
const http = require('http');

const btnStart = document.getElementById("btnStart")
const portInput = document.getElementById("portInput")
const clientCount = document.getElementById("clientCount")
const robotCount = document.getElementById("robotCount")

window.clients = {};
window.BroadcastAll = function (msg) {
    console.log("1", {msg});
    window.lastMsg = msg;

    if (server == null) {
        alert("Server belum berjalan!")
        return;
    }

    for (const [key, it] of Object.entries(window.clients)) {
        it.send(msg ?? "ssszzz");
    }
}
window.BroadcastCommand = function (msg) {
    console.log("2",{msg});

    window.BroadcastAll(JSON.stringify({
        Kind: "COMMAND",
        Content: msg,
        Receiver: "ALL"
    }))
}

function UpdateClientOverview() {
    clientCount.innerText = Object.keys(window.clients).length;
}

function UpdateTelemetry(clientId, tele) {
    window.clients[clientId].telemetry = tele;
    let robCount = 0;

    for (const [key, it] of Object.entries(window.clients)) {
        if (it.telemetry) {
            robCount++;
        }
    }
    robotCount.innerText = robCount;
}

btnStart.addEventListener('click', function (e) {
    if (server) {
        // Stop
        console.log("Stopping server");
        for (const [key, socket] of Object.entries(window.clients)) {
            socket.close();
            delete window.clients[key];
        }
        server.close();
        window.clients = {}
        server = null;
        btnStart.classList.remove("bg-danger");
        portInput.disabled = false;
        btnStart.innerText = "Start";
        UpdateClientOverview();
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

            // WebSocket server
            wsServer.on('request', function (request) {
                let connection = request.accept(null, request.origin);

                clientKey++;
                const myConnectionKey = clientKey;
                window.clients[myConnectionKey] = connection;
                UpdateClientOverview();

                connection.on('message', function (message) {
                    if (message.type === 'binary') {
                        // Berupa binary, parse sebagai json
                        // Anggap merupakan Intercom
                        const intercom = JSON.parse(message.binaryData);

                        if (intercom['Kind'].toUpperCase() === "TELEMETRY") {
                            UpdateTelemetry(myConnectionKey, JSON.parse(intercom.Content));
                        }
                        // console.log(decoded);
                    } else {
                        // Berupa text biasa, dikirim via Websocket Client biasa
                        console.log(message);
                        console.log(window.clients);
                    }
                });

                connection.on('close', function (con) {
                    // close user connection
                    delete window.clients[myConnectionKey];
                    UpdateClientOverview();
                });
            });

            btnStart.innerText = "Stop";
            btnStart.classList.add("bg-danger");
            portInput.disabled = true;
        });
        server.once("error", function (err) {
            server = null;
            console.error(err);
            alert("Tidak bisa membuka server (Buka devconsole untuk pesan error):")
            UpdateClientOverview();
        })
    }
})
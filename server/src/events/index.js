import init from "./init.js";
import stream from "./stream.js";
import record from "./record.js";
import end from "./end.js";

export function event(ws)  {
    ws.on("connection", (socket) => {
        console.log("Connection")

        let user = {}
        let file = {}

        socket.on("message", (message) => {
            console.log(message)
        })

        socket.on("init", (event) => {
            init(event, user, file)
        })


        socket.on("stream", (event) => {
            stream(socket)
        })

        socket.on("record", (event) => {
            record(event, user, file)
        })

        socket.on("disconnect", (event) => {
            end(socket, user, file)
        })
    })
}

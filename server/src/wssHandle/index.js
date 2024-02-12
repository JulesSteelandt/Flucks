export default (wss) => {
    wss.on("connection", (socket) => {
        console.log("Connection")
    })
}
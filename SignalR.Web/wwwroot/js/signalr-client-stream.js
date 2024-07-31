$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
    const broadCastStreamDataToAllClientsMethodCall = "BroadCastStreamDataToAllClient";
    const receiveMessageAsStreamForAllClientsClientMethodCall = "ReceiveMessageAsStreamForAllClients";

    async function start() {

        try {
            await connection.start().then(() => {
                console.log("connection established with hub");
                $("#div_connectionId").html(`Connection Id : ${connection.connectionId}`);

            });
        } catch (error) {
            console.error("error occured when establishing connection with hub", error)
            setTimeout(() => start(), 5000)
        }
        
    }

    connection.onclose(async () => {
        await start();
    })

    start();

    $("#btn_from_client_to_hub").click(function () {
        const messages = $("#txt_stream").val();

        const chunks = messages.split(";");

        const subject = new signalR.Subject();

        connection.send(broadCastStreamDataToAllClientsMethodCall, subject).catch(err => console.error(err));

        chunks.forEach(chunk => {
            subject.next(chunk);
        });

        subject.complete();
    })

    connection.on(receiveMessageAsStreamForAllClientsClientMethodCall, (message) => {
        $("#stream_box").append(`<p>${message}</p>`)
    })
    


});
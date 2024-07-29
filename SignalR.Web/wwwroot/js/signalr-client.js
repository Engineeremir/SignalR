$(document).ready(function () {
    const broadCastMessageToAllClientsMethodCall = "BroadCastMessageToAllClients";
    const receiveMessageForAllClientsClientMethodCall = "ReceiveMessageForAllClients";

    const broadCastMessageToCallerClientMethodCall = "BroadCastMessageToCallerClient";
    const receiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const broadCastMessageTotherClientsMethodCall = "BroadCastMessageToOtherClients";
    const receiveMessageForOtherClientsMethodCall = "ReceiveMessageForOtherClients";

    const broadCastMessageToSpesificClientMethodCall = "BroadCastMessageToSpesificClient";
    const receiveMessageForSepesificClientMethodCall = "ReceiveMessageForSpesificClient";


    const receiveConnectedClientCountMethodCall = "ReceiveConnectedClientCount";
    
    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => {
            console.log("connection established with hub");
            $("#div_connectionId").html(`Connection Id : ${connection.connectionId}`);

        }); 
    }

    try {
        start();
    } catch {
        setTimeout(()=>start(),5000)
    }

    connection.on(receiveMessageForAllClientsClientMethodCall, (message) => {
        console.log("message", message)
    })

    connection.on(receiveMessageForCallerClientMethodCall, (message) => {
        console.log("message", message)
    })

    connection.on(receiveMessageForOtherClientsMethodCall, (message) => {
        console.log("message", message)
    })

    connection.on(receiveMessageForSepesificClientMethodCall, (message) => {
        console.log("message", message)
    })


    var span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountMethodCall, (count) => {
        span_client_count.text(count);
        console.log("Connected client count", count)
    })



    $("#btn-send-message-all-client").click(function () {
        const message = "all client";

        connection.invoke(broadCastMessageToAllClientsMethodCall, message).catch(err => console.error("error",err));
    })

    $("#btn-send-message-caller-client").click(function () {
        const message = "caller client";

        connection.invoke(broadCastMessageToCallerClientMethodCall, message).catch(err => console.error("error", err));
    })

    $("#btn-send-message-other-client").click(function () {
        const message = "other client";

        connection.invoke(broadCastMessageTotherClientsMethodCall, message).catch(err => console.error("error", err));
    })

    $("#btn-send-message-spesific-client").click(function () {
        const connectionId= $("#text_connectionId").val();
        const message = "spesific client";

        connection.invoke(broadCastMessageToSpesificClientMethodCall, message, connectionId).catch(err => console.error("error", err));
    })
})
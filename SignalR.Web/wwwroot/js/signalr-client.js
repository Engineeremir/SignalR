$(document).ready(function () {
    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
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

    const broadCastMessageToAllClientsMethodCall = "BroadCastMessageToAllClients";
    const receiveMessageForAllClientsClientMethodCall = "ReceiveMessageForAllClients";

    const broadCastMessageToCallerClientMethodCall = "BroadCastMessageToCallerClient";
    const receiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const broadCastMessageTotherClientsMethodCall = "BroadCastMessageToOtherClients";
    const receiveMessageForOtherClientsMethodCall = "ReceiveMessageForOtherClients";

    const broadCastMessageToSpesificClientMethodCall = "BroadCastMessageToSpesificClient";
    const receiveMessageForSepesificClientMethodCall = "ReceiveMessageForSpesificClient";

    const broadCastMessageToGroupedClientsMethodCall = "BroadCastMessageToGroupedClients";
    const receiveMessageForGrupedClientsMethodCall = "ReceiveMessageForGroupedClients";

    const broadCastMessageToAllTypedClientsMethodCall = "BroadCastMessageToTypedClients";
    const receiveMessageForAllTypedClientsClientMethodCall = "ReceiveMessageForTypedClients";

    const receiveConnectedClientCountMethodCall = "ReceiveConnectedClientCount";
    
    
    const groupA = "GroupA";
    const groupB = "GroupB";
    let currentGroupList = [];

    function refreshGroupList() {
        $("#groupList").empty();
        currentGroupList.forEach(x =>{
            $("#groupList").append(`<p>${x}</p>`)
        })
    }

    $("#btn-add-to-group-A").click(function () {

        if (currentGroupList.includes(groupA)) return;

        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();
        })
    })

    $("#btn-exit-from-group-A").click(function () {
        if (!currentGroupList.includes(groupA)) return;
        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupA);
            refreshGroupList();
        })
    })

    $("#btn-add-to-group-B").click(function () {
        if (currentGroupList.includes(groupB)) return;
        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();
        })
    })

    $("#btn-exit-from-group-B").click(function () {
        if (!currentGroupList.includes(groupB)) return;
        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupB);
            refreshGroupList();
        })
    })

    $("#btn-send-message-to-group-A").click(function () {
        const message = "Message for group A";

        connection.invoke(broadCastMessageToGroupedClientsMethodCall, groupA, message).catch(err => console.error("error", err));
    })

    connection.on(receiveMessageForGrupedClientsMethodCall, (message) => {
        console.log("message", message)
    })

    $("#btn-send-message-to-group-B").click(function () {
        const message = "Message for group B";

        connection.invoke(broadCastMessageToGroupedClientsMethodCall, groupB, message).catch(err => console.error("error", err));
    })

    connection.on(receiveMessageForGrupedClientsMethodCall, (message) => {
        console.log("message", message)
    })


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

    connection.on(receiveMessageForAllTypedClientsClientMethodCall, (message) => {
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

    $("#btn-send-message-to-complexed-type").click(function () {
        const product = {id:1,name:"Product1",price:100}

        connection.invoke(broadCastMessageToAllTypedClientsMethodCall, product).catch(err => console.error("error", err));
    })

    
})
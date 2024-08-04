$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampletypesafehub").configureLogging(signalR.LogLevel.Information).build();
    const broadCastStreamDataToAllClientsMethodCall = "BroadCastStreamDataToAllClient";
    const receiveMessageAsStreamForAllClientsClientMethodCall = "ReceiveMessageAsStreamForAllClients";


    const broadCastProductStreamDataToAllClientMethodCall = "BroadCastProductStreamDataToAllClient";
    const receiveProductsAsStreamForAllClientsClientMethodCall = "ReceiveProductsAsStreamForAllClients";

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


    $("#btn_from_client_to_hub2").click(function () {

        const productList = [
            { id: 1, name: "product1",price: 100 },
            { id: 2, name: "product2",price: 200 },
            { id: 3, name: "product3",price: 300 },
            { id: 4, name: "product4",price: 400 },
            { id: 5, name: "product5",price: 500 },
            { id: 6, name: "product6",price: 600 }
        ]
        

        const subject = new signalR.Subject();

        connection.send(broadCastProductStreamDataToAllClientMethodCall, subject).catch(err => console.error(err));

        productList.forEach(product => {
            subject.next(product);
        });

        subject.complete();
    })

    connection.on(receiveProductsAsStreamForAllClientsClientMethodCall, (product) => {
        $("#stream_box").append(`<p>${product.id}-${product.name}-${product.price}</p>`)
    })



});
// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.SignalR.Client;
using SignalR.ConsoleApp;

Console.WriteLine("Hello, World!");
var connection = new HubConnectionBuilder().WithUrl("https://localhost:7038/exampletypesafehub").Build();

connection.StartAsync().ContinueWith((result) =>
{
    Console.WriteLine(result.IsCompletedSuccessfully ? "Connected" : "Failed to connect");
});

connection.On<Product>("ReceiveMessageForTypedClients", (product) =>
{
    Console.WriteLine($"Recieved Message: {product.Id}-{product.Name}-{product.Price}");
});

while (true)
{
    var key = Console.ReadLine();
    if (key=="exit")
    {
        break;
    }
    else
    {
        var newProduct = new Product(2, "product2", 200);
        await connection.InvokeAsync("BroadCastMessageToTypedClients",newProduct);
    }
}

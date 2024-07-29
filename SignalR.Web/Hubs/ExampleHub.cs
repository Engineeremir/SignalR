using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs;

public class ExampleHub : Hub
{
    public async Task BroadCastMessageToAllClients(string message)
    {
        await Clients.All.SendAsync("ReceiveMessageForAllClients", message);
    }
}

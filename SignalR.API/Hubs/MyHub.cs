using Microsoft.AspNetCore.SignalR;

namespace SignalR.API.Hubs
{
    public class MyHub:Hub<IHub>
    {
        public async Task BroadCastMessageToAllClients(string message)
        {
            await Clients.All.ReceiveMessageForAllClients(message);
        }
    }
}

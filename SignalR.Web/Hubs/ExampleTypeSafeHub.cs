using Microsoft.AspNetCore.SignalR;
using SignalR.Web.Models;

namespace SignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        private static int ConnectedClientCount = 0;
        public async Task BroadCastMessageToAllClients(string message)
        {
            await Clients.All.ReceiveMessageForAllClients(message);
        }

        public override async Task OnConnectedAsync()
        {
            ConnectedClientCount++;
            await Clients.All.ReceiveConnectedClientCount(ConnectedClientCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedClientCount--;
            await Clients.All.ReceiveConnectedClientCount(ConnectedClientCount);
            await base.OnDisconnectedAsync(exception);
        }
        public async Task BroadCastMessageToCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }
        public async Task BroadCastMessageToOtherClients(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClients(message);
        }
        public async Task BroadCastMessageToSpesificClient(string message, string connectionId)
        {
            await Clients.Client(connectionId).ReceiveMessageForSpesificClient(message);
        }
        public async Task BroadCastMessageToGroupedClients(string groupName, string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupedClients(message);
        }
        public async Task BroadCastMessageToTypedClients(Product product)
        {
            await Clients.All.ReceiveMessageForTypedClients(product);
        }

        public async Task BroadCastStreamDataToAllClient(IAsyncEnumerable<string> nameAsChunks)
        {
            await foreach (var item in nameAsChunks)
            {
                await Task.Delay(1000);
                await Clients.All.ReceiveMessageAsStreamForAllClients(item);
            }

        }

        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"You have been joined to the group {groupName}");
            await Clients.Others.ReceiveMessageForOtherClients($"User {Context.ConnectionId} joined to the group");
        }
        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"You have been exited from the group {groupName}");
            await Clients.Others.ReceiveMessageForOtherClients($"User {Context.ConnectionId} exited from the group");
        }


    }
}

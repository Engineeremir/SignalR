using SignalR.Web.Models;

namespace SignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClients(string message);
        Task ReceiveConnectedClientCount(int clientCounts);
        Task ReceiveMessageForCallerClient(string message);
        Task ReceiveMessageForOtherClients(string message);
        Task ReceiveMessageForSpesificClient(string message);
        Task ReceiveMessageForGroupedClients(string message);
        Task AddGroup(string groupName);
        Task RemoveGroup(string groupName);
        Task ReceiveMessageForTypedClients(Product product);
        Task ReceiveMessageAsStreamForAllClients(string name);
    }
}

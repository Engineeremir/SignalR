namespace SignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClients(string message);
        Task ReceiveConnectedClientCount(int clientCounts);
        Task ReceiveMessageForCallerClient(string message);
        Task ReceiveMessageForOtherClients(string message);
        Task ReceiveMessageForSpesificClient(string message);
    }
}

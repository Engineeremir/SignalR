namespace SignalR.API.Hubs
{
    public interface IHub
    {
        Task ReceiveMessageForAllClients(string message);
    }
}

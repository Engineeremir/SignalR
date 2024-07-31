using Microsoft.AspNetCore.SignalR.Client;

namespace SignalR.WorkerService
{
    public class Worker(ILogger<Worker> logger,IConfiguration configuration) : BackgroundService
    {
        
        private HubConnection? connection;

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            connection!.On<Product>("ReceiveMessageForTypedClients", (product) =>
            {
                logger.LogInformation($"Recieved Message: {product.Id}-{product.Name}-{product.Price}");
            });

            return Task.CompletedTask;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            connection = new HubConnectionBuilder().WithUrl(configuration.GetSection("SignalR")["Hub"]!).Build();
            connection?.StartAsync().ContinueWith((result) =>
            {
                logger.LogInformation(result.IsCompletedSuccessfully ? "Connected" : "Failed to connect");
            });
            return base.StartAsync(cancellationToken);
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await connection.StopAsync(cancellationToken);
            await connection!.DisposeAsync();
        }
    }
}

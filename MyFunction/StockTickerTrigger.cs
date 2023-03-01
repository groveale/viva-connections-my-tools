using System;
using Azure.Data.Tables;
using Azure.Data.Tables.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace groverale
{
    public class StockTickerTrigger
    {
        // Every 5 seconds
        [FunctionName("StockTickerTrigger")]
        public void Run([TimerTrigger("*/5 * * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            // // Construct a new "TableServiceClient using a TableSharedKeyCredential.

            // var serviceClient = new TableServiceClient(
            //     new Uri(storageUri),
            //     new TableSharedKeyCredential(accountName, storageAccountKey));

            // // Create a new table. The TableItem class stores properties of the created table.
            // TableItem table = serviceClient.CreateTableIfNotExists(tableName);
            // Console.WriteLine($"The created table's name is {table.Name}.");

            // Construct a new <see cref="TableClient" /> using a <see cref="TableSharedKeyCredential" />.
            var tableClient = new TableClient(
                new Uri(storageUri),
                tableName,
                new TableSharedKeyCredential(accountName, storageAccountKey));

            // Create the table in the service.
            tableClient.Create();

            // Make a dictionary entity by defining a <see cref="TableEntity">.
            var tableEntity = new TableEntity(partitionKey, rowKey)
            {
                { "Ticker", "Marker Set" },
                { "Price", 5.00 },
                { "Quantity", 21 }
            };

            Console.WriteLine($"{tableEntity.RowKey}: {tableEntity["Product"]} costs ${tableEntity.GetDouble("Price")}.");

            // Add the newly created entity.
            tableClient.AddEntity(tableEntity);
        }
    }
}

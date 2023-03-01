using System.Threading.Tasks;
using Azure.Data.Tables;

namespace groverale
{
    public static class AzureTablesHelper
    {
        string connectionString = "DefaultEndpointsProtocol=https;AccountName=<your-storage-account-name>;AccountKey=<your-storage-account-key>;EndpointSuffix=core.windows.net";
        string tableName = "<your-table-name>";

        var serviceClient = new TableServiceClient(connectionString);
        var tableClient = serviceClient.GetTableClient(tableName);


        public static async Task UpdateStockPrice(TableServiceClient tableClient, string partitionKey, string rowKey)
        {
            var tableEntity = new TableEntity(partitionKey, rowKey)
            {
                { "Ticker", "Marker Set" },
                { "Price", 5.00 },
                { "Quantity", 21 }
            };

            await tableClient.a (entity, TableUpdateMode.InsertOrReplace);
        }

    }
}
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

string connectionString = "";

if (builder.Environment.IsDevelopment()) // Read from dotnet user-secrets
{
    if (builder.Configuration["DbDataSource"] == null || 
    builder.Configuration["DbInitialCatalog"] == null ||
    builder.Configuration["DbUser"] == null ||
    builder.Configuration["DbPassword"] == null)
    {
        throw new InvalidOperationException();
    }

    var connectionStringBuilder = new SqlConnectionStringBuilder(connectionString);

    connectionStringBuilder.DataSource = builder.Configuration["DbDataSource"];
    connectionStringBuilder.InitialCatalog = builder.Configuration["DbInitialCatalog"];
    connectionStringBuilder.UserID = builder.Configuration["DbUser"];
    connectionStringBuilder.Password = builder.Configuration["DbPassword"];

    connectionString = connectionStringBuilder.ConnectionString;
}
else if (builder.Environment.IsProduction())
{
    connectionString = builder.Configuration.GetConnectionString("Production");
}

if (connectionString == null)
{
    throw new InvalidOperationException();
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();

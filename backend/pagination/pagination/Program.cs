using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using pagination.Configuration.DefaultRepository;
using pagination.Data;
using pagination.Entities;
using pagination.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository<Customer>, CustomerRepository>();
builder.Services.AddScoped<IRepository<Person>, PersonRepository>();

builder.Services.AddDbContext<CustomerDbContext>(options =>
{
    //The name of the connection string is taken from appsetting.json under ConnectionStrings
    options.UseSqlServer(builder.Configuration.GetConnectionString("CustomerContext"));
});


builder.Services.AddScoped<SeedingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var serviceScope = app.Services.CreateScope())
    {
        var seedingService = serviceScope.ServiceProvider.GetRequiredService<SeedingService>();
        seedingService.Seed();
    }
}

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod();
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

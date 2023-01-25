using backend.Core.Interfaces;
using backend.Core.Services;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var builder = WebApplication.CreateBuilder(args);
string? connection = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<ApplicationContext>(options =>
        options.UseSqlServer(connection));

builder.Services.AddTransient<IProfileService, ProfileService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

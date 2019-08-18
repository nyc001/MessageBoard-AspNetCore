using System;
using MessageBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace MessageBackend
{
    public class ApiDBContex : DbContext
    {
        public ApiDBContex(DbContextOptions<ApiDBContex> options) : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

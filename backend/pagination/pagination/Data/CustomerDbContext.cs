using Microsoft.EntityFrameworkCore;
using pagination.Entities;
using System.Collections.Generic;

namespace pagination.Data
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
            : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Person> Persons { get; set; }
    }
}

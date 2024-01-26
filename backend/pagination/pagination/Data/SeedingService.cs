using Microsoft.EntityFrameworkCore;
using pagination.Entities;

namespace pagination.Data
{
    public class SeedingService
    {
        private CustomerDbContext _context;

        public SeedingService(CustomerDbContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (!_context.Customers.Any())
            {
                _context.Database.OpenConnection();
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Customers ON");

                for (int i = 1; i <= 30; i++)
                {
                    string randomName = GenerateRandomName();
                    string email = $"{randomName.ToLower()}@example.com";

                    Customer customer = new Customer(i, randomName, email);

                    _context.Customers.Add(customer);
                }


               

                _context.SaveChanges();

                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Customers OFF");

                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Persons ON");

                for (int i = 1; i <= 30; i++)
                {
                    string randomName = GenerateRandomName();
                    string randomLastName = $"{randomName.ToLower()}";

                    Person person = new Person(i, randomName, randomLastName);

                    _context.Persons.Add(person);
                }
                _context.SaveChanges();
                _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Persons OFF");


                _context.Database.CloseConnection();
            }
        }


        private string GenerateRandomName()
        {
            string[] names = { "Alice Marc", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Nick", "Olivia", "Paul", "Quinn", "Ryan", "Sophia", "Tomy", "Uma", "Victor", "Wendy", "Xander", "Yara", "Zach", "Maria", "Fernando", "Jonior","Rickson"};
            Random random = new Random();
            return names[random.Next(names.Length)];
        }
    }

}

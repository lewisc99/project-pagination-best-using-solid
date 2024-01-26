using pagination.Configuration.DefaultRepository;
using pagination.Data;
using pagination.Entities;

namespace pagination.Repositories
{
    public class PersonRepository : Repository<Person>
    {
        private readonly CustomerDbContext _context;

        public PersonRepository(CustomerDbContext context) : base(context)
        {
            _context = context;
        }

        //private IQueryable<Customer> ApplySearch(IQueryable<Customer> query, string searchBy)
        //{
        //    return query.Where(c =>
        //        EF.Functions.Like(c.Name, $"{searchBy}%") ||
        //        EF.Functions.Like(c.Email, $"{searchBy}%"));
        //}
    }
}

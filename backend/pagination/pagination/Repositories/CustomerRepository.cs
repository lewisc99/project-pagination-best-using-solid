using Microsoft.EntityFrameworkCore;
using pagination.Configuration.DefaultRepository;
using pagination.Data;
using pagination.Entities;

public class CustomerRepository : Repository<Customer>
{
    private readonly CustomerDbContext _context;

    public CustomerRepository(CustomerDbContext context) : base(context)
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

using Microsoft.AspNetCore.Mvc;
using pagination.Configuration.DefaultRepository;
using pagination.Entities;

namespace pagination.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IRepository<Customer> _customerRepository;

        public CustomerController(IRepository<Customer> customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpPost]
        public IActionResult GetPaginatedCustomers([FromBody] PaginationFilter<Customer> filter)
        {
            try
            {
                var result = _customerRepository.GetPaginatedData(filter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it based on your application needs
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}

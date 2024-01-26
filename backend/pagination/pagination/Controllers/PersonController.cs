using Microsoft.AspNetCore.Mvc;
using pagination.Configuration.DefaultRepository;
using pagination.Entities;

namespace pagination.Controllers
{
    [Route("api/persons")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IRepository<Person> _personRepository;

        public PersonController(IRepository<Person> personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpPost]
        public IActionResult GetPaginated([FromBody] PaginationFilter<Person> filter)
        {
            try
            {
                var result = _personRepository.GetPaginatedData(filter);
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

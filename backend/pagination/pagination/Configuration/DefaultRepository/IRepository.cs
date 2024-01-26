namespace pagination.Configuration.DefaultRepository
{
   
    public interface IRepository<T>
    {
        PaginationModel<T> GetPaginatedData(PaginationFilter<T> filter);
    }
}

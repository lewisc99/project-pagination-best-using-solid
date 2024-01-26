namespace pagination.Configuration.DefaultRepository
{
    public class PaginationModel<T>
    {
        public List<T> Data { get; set; }
        public int TotalSize { get; set; }
    }

}

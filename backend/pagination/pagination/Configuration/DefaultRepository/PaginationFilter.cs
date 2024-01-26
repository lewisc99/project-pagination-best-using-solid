namespace pagination.Configuration.DefaultRepository
{
    public class PaginationFilter<T>
    {
        public string? SortBy { get; set; }
        public bool OrderByAscending { get; set; } = true;
        public List<FilterBy>? FilterBy { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SearchBy { get; set; }
    }

    public class FilterBy
    {
        public string PropertyName { get; set; }
        public string FilterValue { get; set; }
    }
}

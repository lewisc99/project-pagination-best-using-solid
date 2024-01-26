namespace pagination.Extensions
{
    public static  class TypeExtensions
    {
        public static bool IsNumericType(this Type type)
        {
            return type == typeof(int) || type == typeof(long) || type == typeof(short) ||
                   type == typeof(float) || type == typeof(double) || type == typeof(decimal);
        }
    }
}

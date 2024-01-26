using System.Linq.Expressions;
using System.Reflection;

namespace pagination.Extensions
{
    public static class QueryableExtensions
    {
        public static IOrderedQueryable<T> OrderByDynamic<T>(this IQueryable<T> query, string orderByProperty, bool desc = false)
        {
            string methodName = desc ? "OrderByDescending" : "OrderBy";
            var type = typeof(T);
            var property = type.GetProperty(orderByProperty, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if (property == null)
            {
                throw new ArgumentException($"Property '{orderByProperty}' not found on type '{type}'.");
            }

            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExpression = Expression.Lambda(propertyAccess, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), methodName, new Type[] { type, property.PropertyType }, query.Expression, Expression.Quote(orderByExpression));
            return query.Provider.CreateQuery<T>(resultExpression) as IOrderedQueryable<T>;
        }


        public static IOrderedQueryable<T> OrderByDescendingDynamic<T>(this IQueryable<T> query, string orderByProperty)
        {
            return query.OrderByDynamic(orderByProperty, true);
        }
    }
}

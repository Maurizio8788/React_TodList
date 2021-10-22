using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Api.Helper
{
    public static class QueryExtension 
    {
        private static readonly MethodInfo ContainsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
        private static readonly MethodInfo StartsWithMethod = typeof(string).GetMethod("StartsWith", new[] { typeof(string) });
        private static readonly MethodInfo EndsWithMethod = typeof(string).GetMethod("EndsWith", new[] { typeof(string) });

        public static Expression<Func<TSource, bool>> LikeExpression<TSource, TMember>( Expression<Func<TSource, TMember>> property, string value)
        {
            var param = Expression.Parameter(typeof(TSource), "t");
            var propertyInfo = GetPropertyInfo(property);
            var member = Expression.Property(param, propertyInfo.Name);

            var startWith = value.StartsWith("*");
            var endsWith = value.EndsWith("*");
            var equal = value.StartsWith("=");

            if (startWith || equal)
                value = value.Remove(0, 1);

            if (endsWith)
                value = value.Remove(value.Length - 1, 1);

            var constant = Expression.Constant(value);
            Expression exp;

            if (equal)
            {
                exp = Expression.Equal(member, constant);
            }
            else
            {
                if (endsWith && startWith)
                {
                    exp = Expression.Call(member, ContainsMethod, constant);
                }
                else if (startWith)
                {
                    exp = Expression.Call(member, EndsWithMethod, constant);
                }
                else if (endsWith)
                {
                    exp = Expression.Call(member, StartsWithMethod, constant);
                }
                else
                {
                    exp = Expression.Call(member, ContainsMethod,constant);
                }
            }

            return Expression.Lambda<Func<TSource, bool>>(exp, param);
        }

        private static PropertyInfo GetPropertyInfo(Expression expression)
        {
            var lambda = expression as LambdaExpression;
            if (lambda == null)
                throw new ArgumentNullException("expression");

            MemberExpression memberExpr = null;

            switch (lambda.Body.NodeType)
            {
                case ExpressionType.Convert:
                    memberExpr = ((UnaryExpression)lambda.Body).Operand as MemberExpression;
                    break;
                case ExpressionType.MemberAccess:
                    memberExpr = lambda.Body as MemberExpression;
                    break;
            }

            if (memberExpr == null)
                throw new InvalidOperationException("Specified expression is invalid. Unable to determine property info from expression.");


            var output = memberExpr.Member as PropertyInfo;

            if (output == null)
                throw new InvalidOperationException("Specified expression is invalid. Unable to determine property info from expression.");

            return output;
        }

        public static IQueryable<TSource> Like<TSource, TMember>(this IQueryable<TSource> source, Expression<Func<TSource, TMember>> parameter, string value)
        {
            return source.Where(LikeExpression(parameter, value));
        }

        public static IQueryable<TSource> SetPage<TSource>(this IQueryable<TSource> source, int pageSize,  int page )
        {
            return source.Skip(page * pageSize).Take(pageSize);
        }
    }
}

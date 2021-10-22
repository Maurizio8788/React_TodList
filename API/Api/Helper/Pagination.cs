using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helper
{
    public class Pagination<T> where T:class
    {
        public T FilterObject { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string? OrderBy { get; set; }
        public bool? IsDescending { get; set; }

        public Pagination()
        {
        }


        public Pagination( T filterObject)
        {
            FilterObject = filterObject;
        }

        public Pagination(T filterObject, int? pageNumber, int? pageSize):this(filterObject)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public Pagination(T filterObject, int? pageNumber, int? pageSize, string? orderBy, bool? isDescending):this(filterObject, pageNumber, pageSize)
        {
            OrderBy = orderBy;
            IsDescending = isDescending;
        }

        
    }
}

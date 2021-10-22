using Api.Db;
using Api.Helper;
using Api.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repository
{
    public interface ITodoListRepository:ISharedRepository<Lista>
    {
        Task<IList<Lista>> GetAll();
        Task<IList<Lista>> Search( Pagination<Lista> filter );
        Task<int> DeleteCompleted();
    }
    public class TodolistRepository : SharedRepository<ToDoContext, Lista>, ITodoListRepository
    {
       

        public TodolistRepository(ToDoContext context): base(context)
        {
           
        }

        public async Task<IList<Lista>> GetAll()
        {
            return await _context.List.ToListAsync();
        }

        public async Task<IList<Lista>> Search(Pagination<Lista> filter)
        {
            IQueryable<Lista> query = _dbSet;

            if(filter?.FilterObject != null)
            {
                if (!string.IsNullOrEmpty(filter.FilterObject.Titolo))
                {
                    query = query.Like(x => x.Titolo , filter.FilterObject.Titolo);
                }
                if(!string.IsNullOrEmpty(filter.FilterObject.Categoria))
                {
                    query = query.Where(x => x.Categoria.Equals(filter.FilterObject.Categoria));
                }
                if(filter.FilterObject.Attivi.HasValue )
                {
                    query = query.Where(x => x.Attivi == filter.FilterObject.Attivi);
                }

                query = query.SetPage(filter.PageSize.GetValueOrDefault(), filter.PageNumber.GetValueOrDefault());
            }
                return await query.ToListAsync();
        }

        public async Task<int> DeleteCompleted()
        {
            var entities = _context.List.Where(x => x.Attivi.Equals(false) );
            _context.List.RemoveRange(entities);
           
            return await _context.SaveChangesAsync();
        }
    }
}

using Api.Db;
using Api.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repository
{
    public interface ICategoryRepository : ISharedRepository<Categorie>
    {
        Task<IList<Categorie>> GetAll();
       
    }
    public class CategoryRepository : SharedRepository<ToDoContext, Categorie>, ICategoryRepository
    {

        public CategoryRepository( ToDoContext context ) : base(context){}

        public async Task<IList<Categorie>> GetAll()
        {
            return await _context.Category.ToListAsync();
        }

    }
}

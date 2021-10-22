using Api.Model;
using Api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface ICategoryService
    {
        Task<IList<Categorie>> GetAll();
        Task<object> AddCategory(Categorie newCategory);
        Task<object> DeleteCategory(Categorie entity);
        Task<object> UpdateCategory(Categorie entity);
    }
    public class CategoryService : MasterService, ICategoryService
    {
        private IWrapperRepository _db;
        public CategoryService(IWrapperRepository wrapperRepository)
        {
            this._db = wrapperRepository;
        }

        public async Task<object> AddCategory(Categorie newCategory)
        {
            return await _db.CategoryRepository.Insert(newCategory);
        }

        public async Task<object> DeleteCategory(Categorie entity)
        {
            return await _db.CategoryRepository.Delete(entity);
        }

        public async Task<IList<Categorie>> GetAll()
        {
            return await _db.CategoryRepository.GetAll();
        }

        public async Task<object> UpdateCategory(Categorie entity)
        {
            return await _db.CategoryRepository.Update(entity);
        }
    }
}

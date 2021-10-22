using Api.Db;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repository
{
    public interface ISharedRepository<TEntityDb> where TEntityDb : EntityDb
    {
        Task<object> Insert(TEntityDb entity);
        Task<object> Update( TEntityDb entity );
        Task<object> Delete(TEntityDb entity);
        Task<TEntityDb> GetById(int id, bool deteachEntity = false);
    }
    public abstract class SharedRepository< Context, TEntityDb> : ISharedRepository<TEntityDb>
        where TEntityDb : EntityDb
        where Context : DbContext, new()
    {
        protected Context _context;
        protected DbSet<TEntityDb> _dbSet;
        public SharedRepository( Context context)
        {
            this._context = context;
            this._dbSet = context.Set<TEntityDb>();
        }

        public async Task<Object> Delete(TEntityDb entity)
        {
            var objEntity = await GetById(entity.Id, true);
            if (objEntity != null)
            {
                _context.Entry(objEntity).State = EntityState.Deleted;
                _dbSet.Remove(objEntity);
                await _context.SaveChangesAsync();
            }

            return entity;

        }

        public async Task<TEntityDb> GetById(int id, bool deteachEntity = false)
        {
            var entity =await _dbSet.FindAsync(id);
            if ( entity != null && deteachEntity )
            {
                _context.Entry(entity).State = EntityState.Detached;
            }

            return entity;
        }

        public virtual async Task<object> Insert(TEntityDb entity)
        {
            _context.Entry(entity).State = EntityState.Added;
            _dbSet.Add(entity);
            return await _context.SaveChangesAsync();
        }

        public virtual async Task<object> Update(TEntityDb entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _dbSet.Update(entity);
            return await _context.SaveChangesAsync();
        }


    }
}

using Api.Helper;
using Api.Model;
using Api.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface ITodoListService
    {
        Task<IList<Lista>> GetAll();
        Task<object> AddNewTask( Lista item);
        Task<object> UpdateTask(Lista item);
        Task<object> DeleteTask(Lista entity);
        Task<IList<Lista>> SearchTask(Pagination<Lista> filter);
        Task<int> DeletedComplete();
    }
    public class TodoListService : MasterService, ITodoListService
    {
        private readonly IWrapperRepository _db;

        public TodoListService(IWrapperRepository db )
        {
            this._db = db;
        }

        public async Task<object> AddNewTask( Lista item )
        {
            return await _db.TodoListRepository.Insert(item);
        }

        public async Task<int> DeletedComplete()
        {
            return await _db.TodoListRepository.DeleteCompleted();
        }

        public async Task<object> DeleteTask(Lista enity)
        {
            return await _db.TodoListRepository.Delete(enity);
        }

        public async Task<IList<Lista>> GetAll()
        {
            return await _db.TodoListRepository.GetAll();
        }

        public async Task<IList<Lista>> SearchTask(Pagination<Lista> filter)
        {
            return await _db.TodoListRepository.Search(filter);
        }

        public async Task<object> UpdateTask(Lista item)
        {
            return await _db.TodoListRepository.Update(item);
        }
    }
}

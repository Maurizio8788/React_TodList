using Api.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repository
{
    public interface IWrapperRepository
    {
        ITodoListRepository TodoListRepository { get; }
        ICategoryRepository CategoryRepository { get; }
    }
    public class WrapperRepository:BaseDbManager<ToDoContext>, IWrapperRepository
    {
        private TodolistRepository _TodoListRepository = null;
        private CategoryRepository _CategoryRepository = null;

        public WrapperRepository( ToDoContext _context): base(_context)
        {

        }

        public ITodoListRepository TodoListRepository
        {
            get
            {
                if(this._TodoListRepository == null)
                {
                    this._TodoListRepository = new TodolistRepository(base.context);
                }

                return this._TodoListRepository;
            }
        }

        public ICategoryRepository CategoryRepository 
        {
            get
            {
                if (this._CategoryRepository == null)
                {
                    this._CategoryRepository = new CategoryRepository(base.context);
                }

                return this._CategoryRepository;
            }
        }
    }
}

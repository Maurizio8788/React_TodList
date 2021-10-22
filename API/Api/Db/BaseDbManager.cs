using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Db
{
    public interface IBaseDbManager
    {
    }
    public abstract class BaseDbManager<Context> : IDisposable, IBaseDbManager where Context : DbContext, new()
    {
        protected readonly Context context;
        public BaseDbManager(Context context)
        {
            this.context = context;
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);

        }
    }
}

using Api.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Db
{
    public class ToDoContext : DbContext
    {

        public ToDoContext()
        {

        }
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
        }

        public DbSet<Lista> List { get; set; }
        public DbSet<Categorie> Category{get; set;}
    }
}

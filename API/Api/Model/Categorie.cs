using Api.Db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Model
{
    public class Categorie :EntityDb
    {
        public string Categoria { get; set; }
    }
}

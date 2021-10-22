using Api.Db;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Model
{
    public class Lista:EntityDb
    {
        public string Titolo { get; set; }
        
        [ForeignKey("Categoria")]
        public string Categoria { get; set; }
        
        [Column(TypeName="date")]
        public DateTime? Giorno { get; set; }
        public bool? Attivi { get; set; }

    }
}

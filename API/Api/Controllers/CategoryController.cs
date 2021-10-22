using Api.Helper;
using Api.Model;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController( ICategoryService service)
        {
            this._service = service;
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorie>>> GetAll()
        {
            Response message = new Response();
            try
            {
                var response = await _service.GetAll();
                return Ok(response);
            }
            catch (Exception ex)
            {
                message.Ok = false;
                message.Msg = ex.Message;
                return Ok(message);
            }
        }

        [Route("AddCategory")]
        [HttpPost]
        public async Task<ActionResult> AddCategory([FromBody] Categorie newCategory)
        {
            try
            {
                var response = await _service.AddCategory(newCategory);
                return Ok("Categoria Aggiunta!");
            }
            catch (Exception ex)
            {
                var message = new
                {
                    Ok = false,
                    msg = ex.Message
                };

                return new ObjectResult(message);
            }
        }

        [Route("DeleteCategory")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCategory( [FromBody] Categorie categorie )
        {
            try
            {
                var response = await _service.DeleteCategory(categorie);
                return Ok("Record Cancellato!!");
            }
            catch (Exception ex)
            {
                var message = new
                {
                    ok = false,
                    msg = ex.Message
                };

                return new ObjectResult(message);
            }
        }

        [Route("UpdateCategory")]
        [HttpPut]
        public async Task<ActionResult> UpdateCategory([FromBody] Categorie categorie)
        {
            try
            {
                var result = await _service.UpdateCategory(categorie);
                return Ok("Record Aggiornato Correttamente");
            }
            catch (Exception ex)
            {
                var message = new
                {
                    Ok = false,
                    msg = ex.Message
                };

                return new ObjectResult(message);
            }
        }


    }
}

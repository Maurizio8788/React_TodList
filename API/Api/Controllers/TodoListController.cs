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
    public class TodoListController : ControllerBase
    {
        private readonly ITodoListService _service;

        public TodoListController( ITodoListService service )
        {
            this._service = service;
        }

        [Route("GetAll")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lista>>> GetAll()
        {
   
            try
            {
                var response = await _service.GetAll();
                return Ok(response);
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

        [Route("AddNewTask")]
        [HttpPost]
        public async Task<IActionResult> AddNewTask( [FromBody] Lista item )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var response = await _service.AddNewTask(item);
                return Ok("Record Inserito correttamente");
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

        [Route("UpdateTask")]
        [HttpPut]
        public async Task<ActionResult> UpdateTask( [FromBody] Lista item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var response = await _service.UpdateTask(item);
                return Ok("L'aggiornamento è riuscito Correttamente");
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

        [Route("DeleteTask")]
        [HttpDelete]
        public async Task<ActionResult> DeleteTask( [FromBody] Lista list)
        {
            try
            {
                var reposnse = await _service.DeleteTask(list);
                return Ok("Lista cancellata correttamente");
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

        [Route("SearchTask")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lista>>> SearchTask( [FromBody] Lista list, int pageNumber=0, int pageSize=5)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var response = await _service.SearchTask(new Pagination<Lista>(list,pageNumber, pageSize));
                return Ok(response);
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

        [Route("DeleteCompleted")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCompleted()
        {
            try
            {
                var response = await _service.DeletedComplete();
                if (response != 0)
                {
                    return Ok("Tutte le liste completate sono state cancellate");
                }
                else
                {
                    return BadRequest("Non è stato possibile eseguire richiesta");
                }
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

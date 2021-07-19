using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly AppDBContext _context;

        public CardController(AppDBContext context)
        {
            _context=context;
        }
        // GET: api/<CardController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listCards = await _context.CreditCardDB.ToListAsync();
                return Ok(listCards);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<CardController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CardController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreditCard card)
        {
            try 
            {
                _context.Add(card);
                await _context.SaveChangesAsync();
                return Ok(card);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<CardController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CreditCard card)
        {
            try
            {
                if (id != card.Id)
                {
                    return NotFound();
                }
                _context.Update(card);
                await _context.SaveChangesAsync();
                return Ok(new { message="Update Success" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<CardController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var card = await _context.CreditCardDB.FindAsync(id);
                if (card == null)
                {
                    return NotFound();
                }
                _context.CreditCardDB.Remove(card);

                await _context.SaveChangesAsync();
                return Ok(card);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

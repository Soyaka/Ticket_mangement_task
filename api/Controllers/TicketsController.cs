using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        // GET: api/Tickets?pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<ActionResult<PaginatedResult<Ticket>>> GetTickets([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _ticketService.GetTicketsAsync(pageNumber, pageSize);
            return Ok(result);
        }

        // GET: api/Tickets/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/Tickets
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            var createdTicket = await _ticketService.CreateTicketAsync(ticket);
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
        }

        // PUT: api/Tickets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            var result = await _ticketService.UpdateTicketAsync(ticket);

            if (!result)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // DELETE: api/Tickets/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var result = await _ticketService.DeleteTicketAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
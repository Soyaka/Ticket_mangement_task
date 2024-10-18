using API.Models;

namespace API.Services
{
    public interface ITicketService
    {
        Task<PaginatedResult<Ticket>> GetTicketsAsync(int pageNumber, int pageSize);
        Task<Ticket?> GetTicketByIdAsync(int id);
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<bool> UpdateTicketAsync(Ticket ticket);
        Task<bool> DeleteTicketAsync(int id);
    }
}
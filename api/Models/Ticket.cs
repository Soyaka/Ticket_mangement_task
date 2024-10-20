namespace API.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "Open";
        public DateTime Date { get; set; }
    }
}

export interface Ticket {
  id: string;
  description: string;
  status: 'open' | 'closed';
  created_at: string;
}

export interface TicketState {
  tickets: Ticket[];
  currentPage: number;
  pageSize: number;
  addTicket: (ticket: Ticket) => void;
  setTickets: (tickets: Ticket[]) => void;
  setPage: (page: number) => void;
}

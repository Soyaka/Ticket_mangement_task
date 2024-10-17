
export interface Ticket {
  id: number
  description: string
  status: 'Open' | 'Closed'
  date: string
}

export interface TicketState {
  tickets: Ticket[];
  currentPage: number;
  pageSize: number;
  addTicket: (ticket: Ticket) => void;
  setTickets: (tickets: Ticket[]) => void;
  setPage: (page: number) => void;
}

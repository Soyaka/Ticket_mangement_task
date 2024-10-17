import { create } from 'zustand';
import { Ticket } from '../types';

interface TicketStore {
  tickets: Ticket[];
  currentPage: number;
  pageSize: number;
  setTickets: (tickets: Ticket[]) => void;
  setPage: (page: number) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  currentPage: 1,
  pageSize: 5,
  setTickets: (tickets) => set({ tickets }),
  setPage: (page) => set({ currentPage: page }),
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
  updateTicket: (id, updates) => set((state) => ({
    tickets: state.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, ...updates } : ticket
    ),
  })),
  deleteTicket: (id) => set((state) => ({
    tickets: state.tickets.filter((ticket) => ticket.id !== id),
  })),
}));
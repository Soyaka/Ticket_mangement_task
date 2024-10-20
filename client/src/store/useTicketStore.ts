import { create } from 'zustand'
import { Ticket } from '../types'

const API_URL = 'http://localhost:5041/api/Tickets'

interface TicketStore {
  tickets: Ticket[]
  fetchTickets: (pageNumber: number, pageSize: number, sortBy: keyof Ticket, sortDirection: 'asc' | 'desc') => Promise<{ items: Ticket[], totalCount: number }>
  addTicket: (ticket: Omit<Ticket, 'id'>) => Promise<void>
  updateTicket: (id: number, updatedFields: Partial<Omit<Ticket, 'id'>>) => Promise<void>
  deleteTicket: (id: number) => Promise<void>
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  fetchTickets: async (pageNumber, pageSize, sortBy, sortDirection) => {
    try {
      const response = await fetch(
        `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data = await response.json();
      set({ tickets: data.items });
      return data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  },
  addTicket: async (ticket) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    })
    if (!response.ok) {
      throw new Error('Failed to add ticket')
    }
    const newTicket = await response.json()
    set((state) => ({ tickets: [...state.tickets, newTicket] }))
  },
  updateTicket: async (id, updatedFields) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    })

    if (!response.ok) {
      throw new Error('Failed to update ticket')
    }

    const updatedTicket = await response.json()


    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === id ? { ...t, ...updatedTicket } : t)),
    }))
  },
  deleteTicket: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error('Failed to delete ticket')
    }
    set((state) => ({ tickets: state.tickets.filter((t) => t.id !== id) }))
  },
}))
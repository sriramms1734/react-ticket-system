import { create } from 'zustand';
import { Ticket, TicketStatus } from '../types/ticket';

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt'>) => void;
  moveTicket: (ticketId: string, status: TicketStatus) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        {
          ...ticket,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date(),
        },
      ],
    })),
  moveTicket: (ticketId, newStatus) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      ),
    })),
}));
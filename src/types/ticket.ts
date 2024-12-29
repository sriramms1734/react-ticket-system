export type TicketStatus = 'todo' | 'in-progress' | 'done';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  imageUrl?: string;
}
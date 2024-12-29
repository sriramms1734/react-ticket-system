import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TicketStatus } from '../types/ticket';
import TicketCard from './TicketCard';
import { useTicketStore } from '../store/ticketStore';

interface TicketColumnProps {
  status: TicketStatus;
  title: string;
}

const TicketColumn: React.FC<TicketColumnProps> = ({ status, title }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const tickets = useTicketStore((state) =>
    state.tickets.filter((ticket) => ticket.status === status)
  );

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[500px] bg-gray-50 rounded-lg p-4 ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketColumn;
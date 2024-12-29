import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { AlertCircle, Clock, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Ticket } from '../types/ticket';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      {ticket.imageUrl && (
        <div className="mb-3">
          <img
            src={ticket.imageUrl}
            alt="Ticket attachment"
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{ticket.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityColors[ticket.priority]
          }`}
        >
          {ticket.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>
            {new Date(ticket.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        {ticket.imageUrl && (
          <div className="flex items-center">
            <ImageIcon className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
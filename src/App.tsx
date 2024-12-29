import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Ticket } from './types/ticket';
import { useTicketStore } from './store/ticketStore';
import TicketColumn from './components/TicketColumn';
import NewTicketForm from './components/NewTicketForm';
import { LayoutGrid } from 'lucide-react';

function App() {
  const moveTicket = useTicketStore((state) => state.moveTicket);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      moveTicket(active.id as string, over.id as Ticket['status']);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LayoutGrid className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
        </div>
        
        <NewTicketForm />
        
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            <TicketColumn status="todo" title="To Do" />
            <TicketColumn status="in-progress" title="In Progress" />
            <TicketColumn status="done" title="Done" />
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { useTicketStore } from '../store/useTicketStore';
import SortableTicketTable from './SortableTicketTable';
import { AddTicketDialog } from './AddTicketDialog';
import { Button } from '@/components/ui/button';

export default function TicketsManager() {
  const { tickets, currentPage, pageSize, setPage } = useTicketStore();
  const [isAddTicketDialogOpen, setIsAddTicketDialogOpen] = useState(false);

  const totalPages = Math.ceil(tickets.length / pageSize);

  return (
    <div className="flex flex-col justify-center items-center p-3 gap-5 ">
      <SortableTicketTable />
    </div>
  );
}
import { useState } from 'react'
import { Ticket } from '@/types'
import { UpdateTicketDialog } from './UpdateTicketDialog'

interface TableRowProps {
  ticket: Ticket
  onUpdate: (id: number, status: 'Open' | 'Closed') => void
  onDelete: (id: number) => void
}

export function TableRow({ ticket, onDelete }: TableRowProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  return (
    <tr className={"bg-gray-100 border border-gray-200"}>
      <td className="py-1 px-2 border">{ticket.id}</td>
      <td className="py-1 px-2 border w-1/3">{ticket.description}</td>
      <td className="py-1 px-2 border">{ticket.status}</td>
      <td className="py-1 px-2 border">
        {new Date(ticket.date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }).replace(',', '-')}
      </td>

      <td className="py-1 px-2  font-semibold underline">
        <button
          className="text-purple-600 hover:text-purple-800 underline mr-2"
          onClick={() => setIsUpdateDialogOpen(true)}
        >
          Update
        </button>
        <button
          className="text-purple-600 hover:text-purple-800 underline"
          onClick={() => onDelete(ticket.id)}
        >
          Delete
        </button>
        <UpdateTicketDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          ticket={ticket}
        />
      </td>
    </tr>
  )
}

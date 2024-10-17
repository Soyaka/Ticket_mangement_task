import React, { useState } from 'react'
import { Ticket } from '../types'
import { UpdateTicketDialog } from './UpdateTicketDialog'

interface TableRowProps {
  ticket: Ticket
  onUpdate: (id: number, status: 'Open' | 'Closed') => void
  onDelete: (id: number) => void
}

export function TableRow({ ticket, onUpdate, onDelete }: TableRowProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  return (
    <tr className={ticket.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="py-3 px-4">{ticket.id}</td>
      <td className="py-3 px-4">{ticket.description}</td>
      <td className="py-3 px-4">{ticket.status}</td>
      <td className="py-3 px-4">{new Date(ticket.date).toLocaleDateString()}</td>
      <td className="py-3 px-4">
        <button
          className="text-purple-600 hover:text-purple-800 mr-2"
          onClick={() => setIsUpdateDialogOpen(true)}
        >
          Update
        </button>
        <button
          className="text-purple-600 hover:text-purple-800"
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
import { Ticket } from '../types'

interface TableRowProps {
  ticket: Ticket
  onUpdate: (id: number, status: 'Open' | 'Closed') => void
  onDelete: (id: number) => void
}

export function TableRow({ ticket, onUpdate, onDelete }: TableRowProps) {
  // Use a default ID if ticket.id is undefined
  const ticketId = ticket.id ?? -1

  return (
    <tr className={ticketId % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
      <td className="py-3 px-4">{ticketId}</td>
      <td className="py-3 px-4">{ticket.description}</td>
      <td className="py-3 px-4">{ticket.status}</td>
      <td className="py-3 px-4">{new Date(ticket.date).toLocaleDateString()}</td>
      <td className="py-3 px-4">
        <button
          className="text-purple-600 hover:text-purple-800 mr-2"
          onClick={() => ticketId !== -1 && onUpdate(ticketId, ticket.status === 'Open' ? 'Closed' : 'Open')}
          disabled={ticketId === -1}
        >
          Update
        </button>
        <button
          className="text-purple-600 hover:text-purple-800"
          onClick={() => ticketId !== -1 && onDelete(ticketId)}
          disabled={ticketId === -1}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
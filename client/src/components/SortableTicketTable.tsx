import { useState, useEffect } from 'react'
import { Ticket } from '../types'
import { useTicketStore } from '../store/useTicketStore'
import { Button } from "@/components/ui/button"
import AddTicketDialog from "./AddTicketDialog"
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { Pagination } from './Pagination'

export default function SortableTicketTable() {
  const { tickets, fetchTickets, updateTicket, deleteTicket } = useTicketStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortColumn, setSortColumn] = useState<keyof Ticket>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchTickets(currentPage, 8, sortColumn, sortDirection)
      .then(data => {
        setTotalPages(Math.ceil(data.totalCount / 8))
      })
      .catch(error => console.error('Failed to fetch tickets:', error))
  }, [currentPage, sortColumn, sortDirection, fetchTickets])


  const handleSort = (column: keyof Ticket) => {
    // Toggle the sort direction if the same column is clicked again
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Otherwise, sort by the newly selected column in ascending order
      setSortColumn(column)
      setSortDirection('asc')
    }
  }


  const handleUpdateTicket = async (id: number, status: 'Open' | 'Closed') => {
    try {
      await updateTicket(id, {status})
      fetchTickets(currentPage, 8, sortColumn, sortDirection)
    } catch (error) {
      console.error('Failed to update ticket:', error)
    }
  }

  const handleDeleteTicket = async (id: number) => {
    try {
      await deleteTicket(id)
      fetchTickets(currentPage, 8, sortColumn, sortDirection)
    } catch (error) {
      console.error('Failed to delete ticket:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="bg-gray-100 shadow-md min-h-[70vh] overflow-y-auto rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <TableHeader
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                ticket={ticket}
                onUpdate={handleUpdateTicket}
                onDelete={handleDeleteTicket}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-700  text-white font-bold py-2 px-4 rounded"
        >
          Add Ticket
        </Button>
        <AddTicketDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onTicketAdded={() => fetchTickets(currentPage, 8, sortColumn, sortDirection)}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
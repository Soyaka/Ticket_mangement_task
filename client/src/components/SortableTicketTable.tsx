import { useState, useEffect, useMemo } from 'react'
import { Ticket } from '@/types'
import { useTicketStore } from '@/store/useTicketStore'
import { Button } from "@/components/ui/button"
import AddTicketDialog from "./AddTicketDialog"
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
import { Pagination } from './Pagination'
import { FilterComponent } from './FilterComponent'

export default function SortableTicketTable() {
  const { tickets, fetchTickets, updateTicket, deleteTicket } = useTicketStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortColumn, setSortColumn] = useState<keyof Ticket>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  // Filter States
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const calculateItemsPerPage = () => {
    const height = window.innerHeight;
    if (height < 600) return 8; // Small screens
    if (height < 800) return 12; // Medium screens
    return 18; // Large screens
  }

  const refreshTickets = async () => {
    try {
      const data = await fetchTickets(currentPage, itemsPerPage, sortColumn, sortDirection)
      const newTotalPages = Math.ceil(data.totalCount / itemsPerPage)
      setTotalPages(newTotalPages)
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages)
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage()
      setItemsPerPage(newItemsPerPage)
    }

    handleResize();
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    refreshTickets()
  }, [currentPage, sortColumn, sortDirection, itemsPerPage])

  const handleSort = (column: keyof Ticket) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedTickets = useMemo(() => {
    return [...tickets]
      .filter(ticket =>
        ticket.description.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
        (dateFilter === '' || ticket.date.includes(dateFilter)) &&
        (statusFilter === 'all' || ticket.status === statusFilter)
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [tickets, sortColumn, sortDirection, descriptionFilter, dateFilter, statusFilter]);

  const handleUpdateTicket = async (id: number, status: 'Open' | 'Closed') => {
    try {
      await updateTicket(id, { status })
      refreshTickets()
    } catch (error) {
      console.error('Failed to update ticket:', error)
    }
  }

  const handleDeleteTicket = async (id: number) => {
    try {
      await deleteTicket(id)
      refreshTickets()
    } catch (error) {
      console.error('Failed to delete ticket:', error)
    }
  }

  const handleAddTicket = () => {
    setIsAddDialogOpen(true)
  }

  const handleTicketAdded = () => {
    setIsAddDialogOpen(false)
    refreshTickets()
    setCurrentPage(totalPages)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <FilterComponent
        descriptionFilter={descriptionFilter}
        setDescriptionFilter={setDescriptionFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="bg-gray-100 shadow-md min-h-[70vh] overflow-y-auto rounded-lg overflow-hidden mt-4">
        <table className="w-full table-fixed">
          <TableHeader
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody>
            {filteredAndSortedTickets.map((ticket) => (
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
          onClick={handleAddTicket}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Ticket
        </Button>
        <AddTicketDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onTicketAdded={handleTicketAdded}
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
import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Ticket {
  id: number
  description: string
  status: 'Open' | 'Closed'
  date: string
}

const API_URL = 'http://localhost:5191/api/Tickets'

export default function TicketManager() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortColumn, setSortColumn] = useState<keyof Ticket>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [newTicket, setNewTicket] = useState<{ description: string, status: 'Open' | 'Closed' }>({ description: '', status: 'Open' })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [currentPage, sortColumn, sortDirection])

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${API_URL}?pageNumber=${currentPage}&pageSize=8&sortBy=${sortColumn}&sortDirection=${sortDirection}`)
      const data = await response.json()
      setTickets(data.items)
      setTotalPages(Math.ceil(data.totalCount / 8))
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
    }
  }

  const handleSort = (column: keyof Ticket) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleAddTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTicket, date: new Date().toISOString() }),
      })
      if (response.ok) {
        setNewTicket({ description: '', status: 'Open' })
        fetchTickets()
        setIsAddDialogOpen(false)
      }
    } catch (error) {
      console.error('Failed to add ticket:', error)
    }
  }

  const handleUpdateTicket = async (id: number, status: 'Open' | 'Closed') => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        fetchTickets()
      }
    } catch (error) {
      console.error('Failed to update ticket:', error)
    }
  }

  const handleDeleteTicket = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchTickets()
      }
    } catch (error) {
      console.error('Failed to delete ticket:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-emerald-500 text-white text-left">
              <th className="py-3 px-4 font-semibold cursor-pointer" onClick={() => handleSort('id')}>
                Ticket Id {sortColumn === 'id' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 font-semibold cursor-pointer" onClick={() => handleSort('description')}>
                Description {sortColumn === 'description' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 font-semibold cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortColumn === 'status' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 font-semibold cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortColumn === 'date' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
              </th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-4">{ticket.id}</td>
                <td className="py-3 px-4">{ticket.description}</td>
                <td className="py-3 px-4">{ticket.status}</td>
                <td className="py-3 px-4">{ticket.date}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-purple-600 hover:text-purple-800 mr-2"
                    onClick={() => handleUpdateTicket(ticket.id, ticket.status === 'Open' ? 'Closed' : 'Open')}
                  >
                    Update
                  </button>
                  <button
                    className="text-purple-600 hover:text-purple-800"
                    onClick={() => handleDeleteTicket(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTicket} className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newTicket.status}
                  onValueChange={(value: 'Open' | 'Closed') => setNewTicket({ ...newTicket, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
                Add Ticket
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mr-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
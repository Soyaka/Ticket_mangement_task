import React, { useState, useEffect } from 'react'
import { useTicketStore } from '../store/useTicketStore'
import { Ticket } from '../types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface UpdateTicketDialogProps {
  isOpen: boolean
  onClose: () => void
  ticket: Ticket
}

export function UpdateTicketDialog({ isOpen, onClose, ticket }: UpdateTicketDialogProps) {
  const [description, setDescription] = useState(ticket.description)
  const [status, setStatus] = useState<'Open' | 'Closed'>(ticket.status)
  const [error, setError] = useState<string | null>(null)
  const updateTicket = useTicketStore((state) => state.updateTicket)

  useEffect(() => {
    setDescription(ticket.description)
    setStatus(ticket.status)
  }, [ticket])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || description.trim().length < 5) {
      setError('Description must be at least 5 characters long.')
      return
    }

    setError(null)

    try {
      // Update ticket
      const updatedTicket = {
        date: ticket.date,
        id: ticket.id,
        description : description,
        status : status,

      }
      await updateTicket(ticket.id, updatedTicket)
      onClose()
    } catch (error) {
      console.error('Failed to update ticket:', error)
      setError('Failed to update ticket. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            {error && <div className="text-red-500 col-span-4">{error}</div>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={(value: 'Open' | 'Closed') => setStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-emerald-500 text-white hover:bg-emerald-600">
              Update Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
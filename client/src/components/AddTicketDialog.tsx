import React, { useState } from 'react'
import { useTicketStore } from '@/store/useTicketStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AddTicketDialogProps {
  isOpen: boolean
  onClose: () => void
  onTicketAdded: () => void
}

export default function AddTicketDialog({ isOpen, onClose, onTicketAdded }: AddTicketDialogProps) {
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'Open' | 'Closed'>('Open')
  const [error, setError] = useState<string | null>(null)
  const addTicket = useTicketStore((state) => state.addTicket)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!description || description.trim().length < 5) {
      setError('Description must be at least 5 characters long.')
      return
    }

    setError(null)

    const newTicket = {
      description,
      status,
      date: new Date().toISOString(),
    }

    try {
      await addTicket(newTicket)
      onTicketAdded()
      onClose()
      setDescription('')
      setStatus('Open')
    } catch (error) {
      console.error('Failed to add ticket:', error)
      setError('Failed to add ticket. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
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
            <Button
              type="submit"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Add Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
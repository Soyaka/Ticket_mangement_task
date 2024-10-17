import React, { useState } from 'react';
import { useTicketStore } from '../store/useTicketStore';
import { Ticket } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTicketDialog({ isOpen, onClose }: AddTicketDialogProps) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'open' | 'closed'>('open');
  const [error, setError] = useState<string | null>(null); // State for error message
  const addTicket = useTicketStore((state) => state.addTicket);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic for the description
    if (!description || description.trim().length < 5) {
      setError('Description must be at least 5 characters long.');
      return; // Prevent submission if validation fails
    }

    // Clear error if validation passes
    setError(null);

    const newTicket: Ticket = {
      id: String(Date.now()),
      description,
      status,
      created_at: new Date().toISOString(),
    };
    addTicket(newTicket);
    onClose();
    setDescription('');
    setStatus('open');
  };

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
            {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select value={status} onValueChange={(value: 'open' | 'closed') => setStatus(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-1 bg-[#00a86b] text-white hover:bg-[#00a86b]/80 hover:text-white"
            type="submit">Add Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

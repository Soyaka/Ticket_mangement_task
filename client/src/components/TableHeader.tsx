import { ChevronDown, ChevronUp } from 'lucide-react'
import { Ticket } from '../types'

interface TableHeaderProps {
  sortColumn: keyof Ticket
  sortDirection: 'asc' | 'desc'
  onSort: (column: keyof Ticket) => void
}

export function TableHeader({ sortColumn, sortDirection, onSort }: TableHeaderProps) {
  const headers: { key: keyof Ticket; label: string }[] = [
    { key: 'id', label: 'Ticket Id' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ]

  return (
    <thead>
      <tr className="bg-emerald-500 text-white text-left">
        {headers.map(({ key, label }) => (
          <th
            key={key}
            className="py-3 px-4 font-semibold cursor-pointer"
            onClick={() => onSort(key)}
          >
            {label}{' '}
            {sortColumn === key && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
          </th>
        ))}
        <th className="py-3 px-4 font-semibold">Actions</th>
      </tr>
    </thead>
  )
}
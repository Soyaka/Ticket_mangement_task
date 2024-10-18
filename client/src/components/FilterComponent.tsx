import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterComponentProps {
  descriptionFilter: string
  setDescriptionFilter: (value: string) => void
  dateFilter: string
  setDateFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  descriptionFilter,
  setDescriptionFilter,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Label htmlFor="description-filter">Description</Label>
        <Input
          id="description-filter"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          placeholder="Filter by description"
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="date-filter">Date</Label>
        <Input
          id="date-filter"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="status-filter">Status</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

import SortableTicketTable from './SortableTicketTable';

export default function TicketsManager() {

  return (
    <div className="flex flex-col justify-center items-center p-3 gap-5 ">
      <SortableTicketTable />
    </div>
  );
}
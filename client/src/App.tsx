import TicketsManager from './components/TicketsManager';
export default function App() {
  return (
    <div className="h-screen flex flex-col justify-center over flow-y-hidden items-center p-3 gap-3">
      <TicketsManager />
    </div>
  );
}
import { useLiveQuery } from 'dexie-react-hooks';
import StatCard from '../components/StatCard';
import { db } from '../core/db';
import type { CashFlowSummary } from '../types/cash-flow-summary';

export default function Insights() {
  // Temp implementation
  const summary = useLiveQuery(() => {
    return db.summary.limit(1).first();
  });

  const insights = JSON.parse(summary?.summary || '{}') as CashFlowSummary;

  return (
    <>
      <h2 className="font-bold mb-3 text-lg">Summary</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <StatCard
          cardTitle="Total Paid In"
          amount={insights?.total?.paidIn || 0}
        />
        <StatCard
          cardTitle="Total Paid Out"
          amount={insights?.total?.paidOut || 0}
        />
        <StatCard
          cardTitle="Send Money"
          amount={insights?.sendMoney?.paidOut || 0}
        />
        <StatCard
          cardTitle="Received"
          amount={insights?.receivedMoney?.paidIn || 0}
        />
      </div>
    </>
  );
}

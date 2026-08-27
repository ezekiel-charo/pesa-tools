import { formatNumber } from '../core/utils';

interface StatCardProps {
  cardTitle: string;
  amount: number;
}

export default function StatCard({ cardTitle, amount }: StatCardProps) {
  return (
    <div className="border border-gray-200 bg-gray-100 rounded-lg p-3">
      <div className="font-medium text-xs text-gray-600">{cardTitle}</div>
      <div className="font-extrabold text-lg text-gray-800">
        {formatNumber(amount)}
      </div>
    </div>
  );
}

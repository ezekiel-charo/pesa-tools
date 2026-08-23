import StatCard from '../components/StatCard';

export default function Insights() {
  return (
    <>
      <h2 className="font-bold mb-2 text-lg">Insights</h2>
      <div className="grid grid-cols-4 gap-2">
        <StatCard cardTitle="Recent Balance" amount="230,000" />
        <StatCard cardTitle="Send Money" amount="230,000" />
        <StatCard cardTitle="Received" amount="230,000" />
        <StatCard cardTitle="Lipa na M-pesa" amount="230,000" />
      </div>
    </>
  );
}

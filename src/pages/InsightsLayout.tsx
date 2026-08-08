import { Link, Outlet } from 'react-router';

export default function InsightsLayout() {
  return (
    <>
      <Link to="">Insights</Link>
      <Link to="transactions">Transactions</Link>
      <Outlet />
    </>
  );
}

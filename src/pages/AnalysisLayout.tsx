import { Link, Outlet } from 'react-router';

export default function AnalysisLayout() {
  return (
    <>
      <Link to="">Summary</Link>
      <Link to="transactions">Transactions</Link>
      <Outlet />
    </>
  );
}

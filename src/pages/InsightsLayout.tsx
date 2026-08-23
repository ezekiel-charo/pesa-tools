import { NavLink, Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function InsightsLayout() {
  return (
    <>
      <Header />
      <main className="max-w-3/5 mx-auto">
        <div className="flex border-b border-gray-200 mt-8 *:py-2 *:px-4 text-sm font-medium">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive
                ? 'text-green-600 border-b-2 border-green-600 font-semibold'
                : ''
            }
            end
          >
            Insights
          </NavLink>
          <NavLink
            to="transactions"
            className={({ isActive }) =>
              isActive
                ? 'text-green-600 border-b-2 border-green-600 font-semibold'
                : ''
            }
          >
            Transactions
          </NavLink>
        </div>
        <div className="min-h-screen pt-7">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

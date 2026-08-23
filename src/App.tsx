import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Insights from './pages/Insights';
import MainLayout from './pages/MainLayout';
import Transactions from './pages/Transactions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={Home} />
        <Route path="insights" Component={MainLayout}>
          <Route index Component={Insights} />
          <Route path="transactions" Component={Transactions} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from 'react-router';
import AnalysisLayout from './pages/AnalysisLayout';
import Home from './pages/Home';
import Summary from './pages/Summary';
import Transactions from './pages/Transactions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={Home} />
        <Route path="analysis" Component={AnalysisLayout}>
          <Route index Component={Summary} />
          <Route path="transactions" Component={Transactions} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

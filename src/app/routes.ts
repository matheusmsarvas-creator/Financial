import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Planning } from './pages/Planning';
import { Goals } from './pages/Goals';
import { OpenFinance } from './pages/OpenFinance';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'transactions', Component: Transactions },
      { path: 'planning', Component: Planning },
      { path: 'goals', Component: Goals },
      { path: 'open-finance', Component: OpenFinance },
    ],
  },
]);
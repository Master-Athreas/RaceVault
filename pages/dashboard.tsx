import type { NextPage } from 'next';
import Dashboard from '../src/components/Dashboard';

interface Props {
  user: any;
  setUser: (u: any) => void;
}

const DashboardPage: NextPage<Props> = ({ user }) => {
  return <Dashboard user={user} />;
};

export default DashboardPage;

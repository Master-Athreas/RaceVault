import type { NextPage } from 'next';
import Marketplace from '../src/components/Marketplace';

interface Props {
  user: any;
  setUser: (u: any) => void;
}

const Home: NextPage<Props> = ({ user, setUser }) => {
  return <Marketplace user={user} setUser={setUser} />;
};

export default Home;

import type { AppProps } from 'next/app';
import '../src/index.css';
import { useState } from 'react';
import Header from '../src/components/Header';
import { GameIntegrationProvider } from '../src/context/GameIntegrationContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);

  return (
    <GameIntegrationProvider>
      <Header user={user} setUser={setUser} />
      <Component {...pageProps} user={user} setUser={setUser} />
    </GameIntegrationProvider>
  );
}

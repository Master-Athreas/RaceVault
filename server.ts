/* eslint-env node */
import express from 'express';

export interface PendingSyncData {
  wallet: string;
  balance: number;
  vehicles: any[];
}

export const pendingSyncCodes = new Map<string, PendingSyncData>();

const app = express();
app.use(express.json());

app.post('/api/verify-sync', (req, res) => {
  const { code, playerId } = req.body || {};
  if (typeof code !== 'string' || typeof playerId !== 'string') {
    res.status(400).json({ success: false });
    return;
  }

  const data = pendingSyncCodes.get(code);
  if (!data) {
    res.json({ success: false });
    return;
  }

  pendingSyncCodes.delete(code);
  res.json({ success: true, wallet: data.wallet, balance: data.balance, vehicles: data.vehicles });
});

export default app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

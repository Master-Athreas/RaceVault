/* eslint-env node */
import { VercelRequest, VercelResponse } from '@vercel/node';

interface PendingSyncData {
  wallet: string;
  balance: number;
  vehicles: any[];
}

const pendingSyncCodes = new Map<string, PendingSyncData>();

pendingSyncCodes.set('YIIM2N', {
  wallet: '0xDEADBEEF',
  balance: 123,
  vehicles: [],
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { code, playerId } = req.body as { code?: string; playerId?: string };
  if (!code || !playerId) {
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
}

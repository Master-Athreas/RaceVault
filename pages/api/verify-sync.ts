import type { NextApiRequest, NextApiResponse } from 'next';
import { pendingCodes } from './init-sync';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { code, playerId } = req.body as { code?: string; playerId?: string };
  if (typeof code !== 'string' || typeof playerId !== 'string') {
    res.status(400).json({ success: false });
    return;
  }

  const data = pendingCodes.get(code);
  if (!data) {
    res.status(404).json({ success: false, error: 'Code not found' });
    return;
  }

  if (data.expiresAt && Date.now() > data.expiresAt) {
    pendingCodes.delete(code);
    res.status(410).json({ success: false, error: 'Code expired' });
    return;
  }

  pendingCodes.delete(code);
  res.json({
    success: true,
    wallet: data.wallet,
    balance: data.balance,
    vehicles: data.vehicles,
  });
}

import { VercelRequest, VercelResponse } from '@vercel/node';
import { pendingCodes } from './init-sync';

export default function handler(req: VercelRequest, res: VercelResponse) {
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
    res.json({ success: false });
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

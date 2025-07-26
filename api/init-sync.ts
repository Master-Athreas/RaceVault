import { VercelRequest, VercelResponse } from '@vercel/node';

export interface PendingData {
  wallet: string;
  balance: number;
  vehicles: string[];
  expiresAt: number;
}

// Simple in-memory store for pending sync codes
export const pendingCodes = new Map<string, PendingData>();

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { code, wallet } = req.body as { code?: string; wallet?: string };
  if (typeof code !== 'string' || typeof wallet !== 'string') {
    res.status(400).json({ success: false });
    return;
  }

  // Store pending pairing data with a fake balance and NFT vehicles
  pendingCodes.set(code, {
    wallet,
    balance: 420,
    vehicles: ['SupraNFT'],
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  res.json({ success: true });
}

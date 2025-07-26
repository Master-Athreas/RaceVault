import { VercelRequest, VercelResponse } from '@vercel/node';

export interface PendingData {
  wallet: string;
  balance: number;
  vehicles: any[];
  expiresAt?: number;
}

// In-memory map of pending sync codes
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

  // For now populate with fake balance and vehicles and set expiry
  pendingCodes.set(code, {
    wallet,
    balance: 420,
    vehicles: ['SupraNFT', 'RX7NFT'],
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  res.json({ success: true });
}

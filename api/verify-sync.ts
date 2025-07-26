export interface PendingSyncData {
  wallet: string;
  balance: number;
  vehicles: any[];
}

const pendingSyncCodes = new Map<string, PendingSyncData>([
  [
    'YIIM2N',
    {
      wallet: '0xFAKE',
      balance: 123,
      vehicles: [],
    },
  ],
]);

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { code, playerId } = req.body || {};
  if (typeof code !== 'string' || typeof playerId !== 'string') {
    res.status(400).json({ success: false });
    return;
  }

  const data = pendingSyncCodes.get(code);
  if (!data) {
    res.status(200).json({ success: false });
    return;
  }

  pendingSyncCodes.delete(code);
  res.status(200).json({
    success: true,
    wallet: data.wallet,
    balance: data.balance,
    vehicles: data.vehicles,
  });
}

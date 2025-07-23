import React, { useState } from 'react';
import { signMessage } from '../utils/web3';
import { 
  Gamepad2, 
  Wifi, 
  WifiOff, 
  Settings, 
  RefreshCw, 
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react';

interface GameIntegrationPanelProps {
  user: any;
}

const GameIntegrationPanel: React.FC<GameIntegrationPanelProps> = ({ user }) => {
  const [isGameConnected, setIsGameConnected] = useState(false);
  const [gameStatus, setGameStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'syncing'>('disconnected');
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncCode, setSyncCode] = useState<string | null>(null);

  const requestPairing = async () => {
    if (!user) return;
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    const message = `/sync ${code}`;
    const signature = await signMessage(user.address, message);
    if (signature) {
      setSyncCode(code);
    }
  };

  const handleGameConnection = async () => {
    if (isGameConnected) {
      setGameStatus('disconnected');
      setIsGameConnected(false);
      setSyncCode(null);
      return;
    }

    setGameStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setGameStatus('connected');
      setIsGameConnected(true);
      setLastSync(new Date());
    }, 2000);
  };

  const handleSync = async () => {
    setGameStatus('syncing');
    
    // Simulate sync process
    setTimeout(() => {
      setGameStatus('connected');
      setLastSync(new Date());
    }, 1500);
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'connected': return 'text-green-400';
      case 'connecting': case 'syncing': return 'text-yellow-400';
      case 'disconnected': return 'text-red-400';
    }
  };

  const getStatusIcon = () => {
    switch (gameStatus) {
      case 'connected': return <CheckCircle className="h-5 w-5" />;
      case 'connecting': case 'syncing': return <RefreshCw className="h-5 w-5 animate-spin" />;
      case 'disconnected': return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusText = () => {
    switch (gameStatus) {
      case 'connected': return 'Game Connected';
      case 'connecting': return 'Connecting to Game...';
      case 'syncing': return 'Syncing Assets...';
      case 'disconnected': return 'Game Disconnected';
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Game Integration</h3>
            <p className="text-gray-400 text-sm">Connect your racing game account</p>
          </div>
        </div>
        <Settings className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>

      {/* Connection Status */}
      <div className="bg-gray-750 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
            <div>
              <p className={`font-semibold ${getStatusColor()}`}>
                {getStatusText()}
              </p>
              {lastSync && (
                <p className="text-xs text-gray-400">
                  Last sync: {lastSync.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
          {isGameConnected ? (
            <Wifi className="h-5 w-5 text-green-400" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-400" />
          )}
        </div>

        {/* Connection Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleGameConnection}
            disabled={gameStatus === 'connecting' || gameStatus === 'syncing'}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              isGameConnected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGameConnected ? 'Disconnect' : 'Connect Game'}
          </button>
          
          {isGameConnected && (
            <>
              <button
                onClick={handleSync}
                disabled={gameStatus === 'syncing'}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${gameStatus === 'syncing' ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={requestPairing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
              >
                Pair with Game
              </button>
            </>
          )}
        </div>
      </div>

      {isGameConnected && syncCode && (
        <div className="bg-gray-750 rounded-lg p-4 mb-6 text-center">
          <p className="text-gray-300 mb-2">Type this command in BeamMP chat to pair:</p>
          <div className="font-mono text-white bg-gray-800 px-3 py-2 rounded-lg inline-block select-all">
            /sync {syncCode}
          </div>
        </div>
      )}

      {/* Game Features */}
      {isGameConnected && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-750 rounded-lg p-3 text-center">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Real-time Sync</p>
              <p className="text-xs text-gray-400">Assets sync automatically</p>
            </div>
            <div className="bg-gray-750 rounded-lg p-3 text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Live Transactions</p>
              <p className="text-xs text-gray-400">Instant game notifications</p>
            </div>
          </div>

          {/* Game Account Info */}
          {user && (
            <div className="bg-gray-750 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Connected Account</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Player ID:</span>
                  <span className="text-white">RaceVault_{user.address.slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Game Level:</span>
                  <span className="text-white">Pro Racer (Level 42)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Races:</span>
                  <span className="text-white">1,247</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Connection Instructions */}
      {!isGameConnected && (
        <div className="bg-gray-750 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">How to Connect</h4>
          <ol className="text-sm text-gray-400 space-y-1">
            <li>1. Launch your racing game</li>
            <li>2. Go to Settings → Web3 Integration</li>
            <li>3. Click "Connect Game" above</li>
            <li>4. Confirm connection in-game</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default GameIntegrationPanel;
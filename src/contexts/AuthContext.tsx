import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { appKit } from '../lib/wallet-config';

interface MockUser {
  id: string;
  wallet_address: string;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  isConnected: boolean;
  walletAddress: string | null;
  user: MockUser | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: (onDisconnect?: () => void) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { address, isConnected: appKitConnected } = useAppKitAccount();
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await appKit.open();
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = (onDisconnect?: () => void) => {
    appKit.disconnect();
    setUser(null);
    console.log('🔌 Wallet disconnected');
    if (onDisconnect) {
      onDisconnect();
    }
  };

  useEffect(() => {
    if (appKitConnected && address) {
      setUser({
        id: `user-${address}`,
        wallet_address: address,
        display_name: `${address.slice(0, 6)}...${address.slice(-4)}`,
        avatar_url: null,
        bio: 'Hushr user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      console.log('✅ Wallet connected:', address);
    } else {
      setUser(null);
    }
  }, [appKitConnected, address]);

  return (
    <AuthContext.Provider
      value={{
        isConnected: appKitConnected,
        walletAddress: address || null,
        user,
        connectWallet,
        disconnectWallet,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

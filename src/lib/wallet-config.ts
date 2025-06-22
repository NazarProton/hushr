import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'viem/chains';

const projectId = 'd654d9b09f10ce0a913234a9b78e2e8c';

const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, polygon, arbitrum, optimism],
  projectId,
});

const metadata = {
  name: 'Hushr',
  description: 'Hushr - Decentralized Social Network',
  url: 'https://hushr.com',
  icons: ['/favicon.png'],
};

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, polygon, arbitrum, optimism],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

export { wagmiAdapter };

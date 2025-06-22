import { getAvatarForUser } from './avatars';
import { getAssetPath } from './paths';

export interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  usdValue: string;
}

export interface Network {
  id: string;
  name: string;
  icon: string;
  chainId: number;
}

export interface MockThread {
  id: string;
  content: string;
  author: string;
  walletAddress: string;
  handle: string;
  avatar: string;
  timestamp: string;
  reactions: {
    comments: number;
    likes: number;
    views: number;
    shares: number;
  };
  hasImage: boolean;
  imageUrl?: string;
}

export interface MockUser {
  id: string;
  wallet_address: string;
  display_name: string;
}

export interface MockMessage {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: MockUser;
  image?: string;
  ticks?: 'one' | 'two';
}

export interface Chat {
  id: string;
  name: string;
  wallet_address: string;
  lastMessage: string;
  messages: MockMessage[];
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  network: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash?: string;
}

export const popularTokens: Token[] = [
  {
    symbol: 'HUSHR',
    name: 'Hushr Token',
    icon: getAssetPath('/favicon.png'),
    balance: '1,250.45',
    usdValue: '$2,500.90',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: getAssetPath('/coins/usdc.svg'),
    balance: '500.00',
    usdValue: '$500.00',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: getAssetPath('/coins/usdt.svg'),
    balance: '750.25',
    usdValue: '$750.25',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: getAssetPath('/coins/eth_logo.svg'),
    balance: '2.5',
    usdValue: '$5,750.00',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: getAssetPath('/coins/bitcoin-logo.svg'),
    balance: '0.15',
    usdValue: '$6,450.00',
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: getAssetPath('/coins/bnb.svg'),
    balance: '5.2',
    usdValue: '$1,560.00',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    icon: getAssetPath('/coins/matic.svg'),
    balance: '1,200.00',
    usdValue: '$840.00',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    icon: getAssetPath('/coins/avax-token.svg'),
    balance: '25.5',
    usdValue: '$765.00',
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    icon: getAssetPath('/coins/uni.svg'),
    balance: '45.2',
    usdValue: '$315.40',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    icon: getAssetPath('/coins/chainlink.svg'),
    balance: '125.8',
    usdValue: '$1,887.00',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: getAssetPath('/coins/dai.svg'),
    balance: '1,000.00',
    usdValue: '$1,000.00',
  },
  {
    symbol: 'COMP',
    name: 'Compound',
    icon: getAssetPath('/coins/comp.svg'),
    balance: '8.5',
    usdValue: '$425.00',
  },
  {
    symbol: 'MKR',
    name: 'Maker',
    icon: getAssetPath('/coins/mkr.svg'),
    balance: '1.2',
    usdValue: '$1,680.00',
  },
  {
    symbol: 'SUSHI',
    name: 'SushiSwap',
    icon: getAssetPath('/coins/sushi.svg'),
    balance: '280.5',
    usdValue: '$224.40',
  },
  {
    symbol: 'CRV',
    name: 'Curve DAO',
    icon: getAssetPath('/coins/crv.svg'),
    balance: '450.0',
    usdValue: '$315.00',
  },
  {
    symbol: 'FTM',
    name: 'Fantom',
    icon: getAssetPath('/coins/ftm.svg'),
    balance: '1,500.0',
    usdValue: '$450.00',
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
    icon: getAssetPath('/coins/arbitrum.svg'),
    balance: '350.0',
    usdValue: '$420.00',
  },
  {
    symbol: 'OP',
    name: 'Optimism',
    icon: getAssetPath('/coins/optimism.svg'),
    balance: '125.0',
    usdValue: '$250.00',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    icon: getAssetPath('/coins/solana-logo.svg'),
    balance: '12.5',
    usdValue: '$1,125.00',
  },
  {
    symbol: 'MANA',
    name: 'Decentraland',
    icon: getAssetPath('/coins/mana.svg'),
    balance: '850.0',
    usdValue: '$340.00',
  },
  {
    symbol: 'SAND',
    name: 'The Sandbox',
    icon: getAssetPath('/coins/SAND.svg'),
    balance: '1,200.0',
    usdValue: '$480.00',
  },
  {
    symbol: 'ENJ',
    name: 'Enjin Coin',
    icon: getAssetPath('/coins/enj.svg'),
    balance: '650.0',
    usdValue: '$195.00',
  },
  {
    symbol: 'BAT',
    name: 'Basic Attention',
    icon: getAssetPath('/coins/bat.svg'),
    balance: '2,500.0',
    usdValue: '$500.00',
  },
  {
    symbol: 'GALA',
    name: 'Gala',
    icon: getAssetPath('/coins/gala.svg'),
    balance: '8,500.0',
    usdValue: '$255.00',
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    icon: getAssetPath('/coins/shib.svg'),
    balance: '50,000,000',
    usdValue: '$450.00',
  },
  {
    symbol: 'APE',
    name: 'ApeCoin',
    icon: getAssetPath('/coins/ape.svg'),
    balance: '85.0',
    usdValue: '$102.00',
  },
  {
    symbol: 'DYDX',
    name: 'dYdX',
    icon: getAssetPath('/coins/dydx.svg'),
    balance: '125.0',
    usdValue: '$187.50',
  },
  {
    symbol: 'LDO',
    name: 'Lido DAO',
    icon: getAssetPath('/coins/LDO.svg'),
    balance: '250.0',
    usdValue: '$375.00',
  },
];

export const networks: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: getAssetPath('/networks/eth.png'),
    chainId: 1,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: getAssetPath('/networks/poligon.png'),
    chainId: 137,
  },
  {
    id: 'bsc',
    name: 'BSC',
    icon: getAssetPath('/networks/bsc.png'),
    chainId: 56,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: getAssetPath('/networks/arbitrum.png'),
    chainId: 42161,
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: getAssetPath('/networks/op.png'),
    chainId: 10,
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    icon: getAssetPath('/networks/avalanche.png'),
    chainId: 43114,
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: getAssetPath('/networks/sol.png'),
    chainId: 101,
  },
];

export const mockThreads: MockThread[] = [
  {
    id: 'mock-26',
    content: 'Check out this amazing view! 🌅',
    author: 'Photo Master',
    walletAddress: '0xabcd...9356',
    handle: '@photomaster',
    avatar: getAvatarForUser('0xa012345678abcdef'),
    timestamp: 'now',
    reactions: { comments: 1, likes: 3, views: 12, shares: 1 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/3.webp'),
  },
  {
    id: 'mock-1',
    content:
      'Just launched my new DeFi protocol! 🚀 Building the future of decentralized finance one smart contract at a time.',
    author: 'Alex Crypto',
    walletAddress: '0x1234...90ab',
    handle: '@alexcrypto',
    avatar: getAvatarForUser('0x1234567890abcdef'),
    timestamp: '2h',
    reactions: { comments: 24, likes: 156, views: 1800, shares: 43 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/1.webp'),
  },
  {
    id: 'mock-2',
    content:
      'Privacy is not about hiding something. Privacy is about protecting something. Your data, your choice.',
    author: 'Maria DeFi',
    walletAddress: '0x2345...1bcd',
    handle: '@mariadefi',
    avatar: getAvatarForUser('0x2345678901bcdef0'),
    timestamp: '4h',
    reactions: { comments: 89, likes: 342, views: 2400, shares: 127 },
    hasImage: false,
  },
  {
    id: 'mock-3',
    content:
      "The beauty of blockchain: immutable, transparent, and trustless. Here's my latest NFT collection dropping tomorrow!",
    author: 'Bob NFT',
    walletAddress: '0x3456...2cde',
    handle: '@bobnft',
    avatar: getAvatarForUser('0x3456789012cdef01'),
    timestamp: '6h',
    reactions: { comments: 67, likes: 234, views: 1200, shares: 89 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/1.png'),
  },
  {
    id: 'mock-4',
    content:
      'Web3 social networks will revolutionize how we connect and share value. No more centralized gatekeepers!',
    author: 'Sarah Web3',
    walletAddress: '0x4567...3def',
    handle: '@sarahweb3',
    avatar: getAvatarForUser('0x4567890123def012'),
    timestamp: '8h',
    reactions: { comments: 45, likes: 198, views: 890, shares: 76 },
    hasImage: false,
  },
  {
    id: 'mock-28',
    content: '',
    author: 'Silent Photographer',
    walletAddress: '0x9876...5432',
    handle: '@silentphoto',
    avatar: getAvatarForUser('0x987654321abcdef0'),
    timestamp: '6h',
    reactions: { comments: 12, likes: 67, views: 234, shares: 8 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/1.png'),
  },
  {
    id: 'mock-5',
    content:
      'Smart contracts are eating the world. Traditional agreements will soon be obsolete. Code is law!',
    author: 'Dev Master',
    walletAddress: '0x5678...4e01',
    handle: '@devmaster',
    avatar: getAvatarForUser('0x567890123def0123'),
    timestamp: '12h',
    reactions: { comments: 123, likes: 456, views: 3200, shares: 234 },
    hasImage: false,
  },
  {
    id: 'mock-6',
    content: 'Just moved 50 ETH to my cold wallet. Security first! 🔒',
    author: 'Crypto Whale',
    walletAddress: '0x6789...5f12',
    handle: '@cryptowhale',
    avatar: getAvatarForUser('0x6789ab123def4567'),
    timestamp: '14h',
    reactions: { comments: 5, likes: 23, views: 156, shares: 7 },
    hasImage: false,
  },
  {
    id: 'mock-7',
    content:
      'New generative art collection dropping next week! Each piece is unique and algorithmically created. 🎨',
    author: 'NFT Artist',
    walletAddress: '0x789a...6023',
    handle: '@nftartist',
    avatar: getAvatarForUser('0x789abc234def5678'),
    timestamp: '15h',
    reactions: { comments: 12, likes: 89, views: 234, shares: 15 },
    hasImage: false,
  },
  {
    id: 'mock-8',
    content:
      'Yield farming on Uniswap V3 is printing money! 💰 APY is insane right now.',
    author: 'DeFi Farmer',
    walletAddress: '0x89ab...7134',
    handle: '@defifarmer',
    avatar: getAvatarForUser('0x89abcd345def6789'),
    timestamp: '16h',
    reactions: { comments: 8, likes: 45, views: 178, shares: 9 },
    hasImage: false,
  },
  {
    id: 'mock-9',
    content:
      'Building the future one smart contract at a time. Web3 infrastructure is getting so much better! ⚡',
    author: 'Web3 Builder',
    walletAddress: '0x9abc...8245',
    handle: '@web3builder',
    avatar: getAvatarForUser('0x9abcde456def789a'),
    timestamp: '17h',
    reactions: { comments: 18, likes: 67, views: 289, shares: 12 },
    hasImage: false,
  },
  {
    id: 'mock-10',
    content:
      'Gas optimization is an art form. Just saved 40% gas on my latest contract deployment! 🚀',
    author: 'Solidity Dev',
    walletAddress: '0xabcd...9356',
    handle: '@soliditydev',
    avatar: getAvatarForUser('0xabcdef567def89ab'),
    timestamp: '18h',
    reactions: { comments: 25, likes: 134, views: 456, shares: 28 },
    hasImage: false,
  },
  {
    id: 'mock-11',
    content:
      'Found a new yield farming opportunity with 200% APY! Risk level: moderate. DYOR! 📊',
    author: 'Yield Hunter',
    walletAddress: '0xbcde...a467',
    handle: '@yieldhunter',
    avatar: getAvatarForUser('0xbcdef0678def9abc'),
    timestamp: '19h',
    reactions: { comments: 7, likes: 34, views: 123, shares: 6 },
    hasImage: false,
  },
  {
    id: 'mock-12',
    content:
      'Just voted on 5 different DAO proposals today. Governance participation is crucial for decentralization! 🗳️',
    author: 'DAO Voter',
    walletAddress: '0xcdef...b578',
    handle: '@daovoter',
    avatar: getAvatarForUser('0xcdef01789defabcd'),
    timestamp: '20h',
    reactions: { comments: 15, likes: 78, views: 234, shares: 19 },
    hasImage: false,
  },
  {
    id: 'mock-13',
    content:
      'Extracted 2.3 ETH profit from sandwich attacks today. MEV is the new gold rush ⚡',
    author: 'MEV Bot',
    walletAddress: '0xdef0...c689',
    handle: '@mevbot',
    avatar: getAvatarForUser('0xdef0123abcdefbcd'),
    timestamp: '21h',
    reactions: { comments: 3, likes: 12, views: 67, shares: 2 },
    hasImage: false,
  },
  {
    id: 'mock-14',
    content:
      'Flash loan arbitrage between Uniswap and SushiSwap netted me 0.8 ETH in one transaction! 💸',
    author: 'Flash Loan',
    walletAddress: '0xef01...d79a',
    handle: '@flashloan',
    avatar: getAvatarForUser('0xef01234bcdefcdef'),
    timestamp: '22h',
    reactions: { comments: 9, likes: 56, views: 189, shares: 11 },
    hasImage: false,
  },
  {
    id: 'mock-15',
    content:
      'Providing liquidity to ETH/USDC pool on Uniswap V3. Concentrated liquidity is the future! 🌊',
    author: 'Liquidity Pro',
    walletAddress: '0xf012...e8ab',
    handle: '@liquiditypro',
    avatar: getAvatarForUser('0xf012345cdefdefef'),
    timestamp: '23h',
    reactions: { comments: 21, likes: 98, views: 345, shares: 24 },
    hasImage: false,
  },
  {
    id: 'mock-16',
    content:
      'Gas prices are at 15 gwei right now! Perfect time for those pending transactions 🔥',
    author: 'Gas Tracker',
    walletAddress: '0x0123...f9bc',
    handle: '@gastracker',
    avatar: getAvatarForUser('0x0123456defef0123'),
    timestamp: '1d',
    reactions: { comments: 4, likes: 27, views: 98, shares: 5 },
    hasImage: false,
  },
  {
    id: 'mock-17',
    content:
      'Bridged 1000 USDC from Ethereum to Polygon. Layer 2 fees are so much cheaper! 🌉',
    author: 'Bridge User',
    walletAddress: '0x1234...0acd',
    handle: '@bridgeuser',
    avatar: getAvatarForUser('0x1234567ef012345'),
    timestamp: '1d',
    reactions: { comments: 13, likes: 71, views: 223, shares: 16 },
    hasImage: false,
  },
  {
    id: 'mock-18',
    content:
      'Staking rewards are compounding nicely! 32 ETH locked in ETH 2.0 for the long term 💎',
    author: 'Staking Guru',
    walletAddress: '0x2345...1bde',
    handle: '@stakingguru',
    avatar: getAvatarForUser('0x2345678f0123456'),
    timestamp: '1d',
    reactions: { comments: 29, likes: 145, views: 478, shares: 32 },
    hasImage: false,
  },
  {
    id: 'mock-19',
    content:
      'Found alpha in a new DeFi protocol! 🔍 Early bird gets the worm. Research is key!',
    author: 'Alpha Seeker',
    walletAddress: '0x3456...2cef',
    handle: '@alphaseeker',
    avatar: getAvatarForUser('0x3456789012345678'),
    timestamp: '1d',
    reactions: { comments: 6, likes: 38, views: 134, shares: 8 },
    hasImage: false,
  },
  {
    id: 'mock-20',
    content:
      'YOLOd into a memecoin and it 10xd! Sometimes being degen pays off 🚀🤡',
    author: 'Degen Trader',
    walletAddress: '0x4567...3df0',
    handle: '@degentrader',
    avatar: getAvatarForUser('0x4567890123456789'),
    timestamp: '1d',
    reactions: { comments: 17, likes: 89, views: 267, shares: 21 },
    hasImage: false,
  },
  {
    id: 'mock-21',
    content:
      'Yield farming across 3 different protocols. Diversification is key in DeFi! 🌾',
    author: 'Yield Farmer',
    walletAddress: '0x5678...4e01',
    handle: '@yieldfarmer',
    avatar: getAvatarForUser('0x567890123456789a'),
    timestamp: '1d',
    reactions: { comments: 11, likes: 63, views: 198, shares: 14 },
    hasImage: false,
  },
  {
    id: 'mock-22',
    content:
      'Arbitrage opportunities are everywhere if you know where to look! Made 0.5 ETH today ⚡',
    author: 'Arbitrage Bot',
    walletAddress: '0x6789...5f12',
    handle: '@arbitragebot',
    avatar: getAvatarForUser('0x6789012345678abc'),
    timestamp: '1d',
    reactions: { comments: 2, likes: 19, views: 76, shares: 3 },
    hasImage: false,
  },
  {
    id: 'mock-23',
    content:
      'LP tokens are earning me passive income while I sleep. DeFi is beautiful! 💰',
    author: 'LP Provider',
    walletAddress: '0x789a...6023',
    handle: '@lpprovider',
    avatar: getAvatarForUser('0x789012345678abcd'),
    timestamp: '1d',
    reactions: { comments: 14, likes: 82, views: 245, shares: 18 },
    hasImage: false,
  },
  {
    id: 'mock-24',
    content:
      'New governance proposal is live! Vote to shape the future of our protocol 🏛️',
    author: 'Governance',
    walletAddress: '0x89ab...7134',
    handle: '@governance',
    avatar: getAvatarForUser('0x89012345678abcde'),
    timestamp: '1d',
    reactions: { comments: 26, likes: 127, views: 389, shares: 31 },
    hasImage: false,
  },
  {
    id: 'mock-25',
    content:
      'Shipped a new feature to our DeFi protocol! Zero downtime deployment on mainnet 🛠️',
    author: 'Protocol Dev',
    walletAddress: '0x9abc...8245',
    handle: '@protocoldev',
    avatar: getAvatarForUser('0x9012345678abcdef'),
    timestamp: '1d',
    reactions: { comments: 8, likes: 47, views: 156, shares: 10 },
    hasImage: false,
  },
];

export const additionalMockThreads: MockThread[] = [
  {
    id: 'load-1',
    content:
      'Just discovered a new layer 2 solution with 0.001 ETH gas fees! This is the future! 🌟',
    author: 'Layer2 Explorer',
    walletAddress: '0xabc1...def2',
    handle: '@layer2explorer',
    avatar: getAvatarForUser('0xabc123def456789'),
    timestamp: '3d',
    reactions: { comments: 34, likes: 178, views: 892, shares: 45 },
    hasImage: false,
  },
  {
    id: 'load-2',
    content:
      'My portfolio is up 300% this month thanks to DeFi yield strategies. WAGMI! 📈💎',
    author: 'DeFi Degen',
    walletAddress: '0xdef2...abc3',
    handle: '@defidegen',
    avatar: getAvatarForUser('0xdef234abc567890'),
    timestamp: '3d',
    reactions: { comments: 67, likes: 445, views: 1567, shares: 89 },
    hasImage: false,
  },
  {
    id: 'load-3',
    content:
      'Built my first smart contract today! It automatically distributes rewards to stakers 🎯',
    author: 'Smart Contract Dev',
    walletAddress: '0x123a...bcd4',
    handle: '@smartcontractdev',
    avatar: getAvatarForUser('0x123abc456def789'),
    timestamp: '4d',
    reactions: { comments: 28, likes: 156, views: 734, shares: 23 },
    hasImage: false,
  },
  {
    id: 'load-4',
    content:
      'NFT drop was insane! Sold out in 3 minutes. Floor price already 10x 🚀',
    author: 'NFT Collector',
    walletAddress: '0x456b...cde5',
    handle: '@nftcollector',
    avatar: getAvatarForUser('0x456bcd789def012'),
    timestamp: '4d',
    reactions: { comments: 92, likes: 567, views: 2134, shares: 156 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/1.webp'),
  },
  {
    id: 'load-5',
    content:
      'Cross-chain bridge working perfectly! Moved assets from ETH to Arbitrum in seconds ⚡',
    author: 'Bridge Master',
    walletAddress: '0x789c...def6',
    handle: '@bridgemaster',
    avatar: getAvatarForUser('0x789cdef012345678'),
    timestamp: '5d',
    reactions: { comments: 15, likes: 89, views: 445, shares: 12 },
    hasImage: false,
  },
  {
    id: 'load-6',
    content:
      'Governance vote passed! New tokenomics will make our protocol even more deflationary 🔥',
    author: 'DAO Member',
    walletAddress: '0xabc7...123d',
    handle: '@daomember',
    avatar: getAvatarForUser('0xabc789123def456'),
    timestamp: '5d',
    reactions: { comments: 78, likes: 234, views: 1023, shares: 67 },
    hasImage: false,
  },
  {
    id: 'load-7',
    content:
      'Liquidity mining rewards are crazy good right now! 400% APY on this new pool 💰',
    author: 'Yield Farmer Pro',
    walletAddress: '0xdef8...456e',
    handle: '@yieldfarmerpro',
    avatar: getAvatarForUser('0xdef890456789abc'),
    timestamp: '6d',
    reactions: { comments: 56, likes: 312, views: 1456, shares: 89 },
    hasImage: false,
  },
  {
    id: 'load-8',
    content:
      'Zero-knowledge proofs are revolutionizing privacy! This technology is mind-blowing 🧠',
    author: 'ZK Researcher',
    walletAddress: '0x123f...789g',
    handle: '@zkresearcher',
    avatar: getAvatarForUser('0x123fab789cdef01'),
    timestamp: '6d',
    reactions: { comments: 43, likes: 201, views: 856, shares: 34 },
    hasImage: false,
  },
  {
    id: 'load-9',
    content:
      'Metaverse land prices going parabolic! Just bought a plot next to a major brand 🏗️',
    author: 'Metaverse Investor',
    walletAddress: '0x456g...abc8',
    handle: '@metaverseinvestor',
    avatar: getAvatarForUser('0x456ghi890abcdef'),
    timestamp: '7d',
    reactions: { comments: 123, likes: 678, views: 2345, shares: 234 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/3.webp'),
  },
  {
    id: 'load-10',
    content:
      'Decentralized identity is the future! No more centralized platforms controlling our data 🔐',
    author: 'Identity Protocol',
    walletAddress: '0x789h...def9',
    handle: '@identityprotocol',
    avatar: getAvatarForUser('0x789hij123defabc'),
    timestamp: '7d',
    reactions: { comments: 67, likes: 289, views: 1123, shares: 78 },
    hasImage: false,
  },
  {
    id: 'load-11',
    content:
      'Flash loan attack prevented by our new security module! DeFi security is evolving 🛡️',
    author: 'Security Auditor',
    walletAddress: '0xabc9...123h',
    handle: '@securityauditor',
    avatar: getAvatarForUser('0xabc901234hijklm'),
    timestamp: '8d',
    reactions: { comments: 89, likes: 445, views: 1567, shares: 123 },
    hasImage: false,
  },
  {
    id: 'load-12',
    content:
      'Automated trading bot made 50% profit this week! Math and code never sleep 🤖',
    author: 'Bot Creator',
    walletAddress: '0xdef0...456i',
    handle: '@botcreator',
    avatar: getAvatarForUser('0xdef012345ijklmn'),
    timestamp: '8d',
    reactions: { comments: 234, likes: 789, views: 3456, shares: 345 },
    hasImage: false,
  },
  {
    id: 'load-13',
    content:
      'Community-driven development is the way! Our DAO just funded 10 new projects 🌱',
    author: 'Community Lead',
    walletAddress: '0x123i...789j',
    handle: '@communitylead',
    avatar: getAvatarForUser('0x123ijk789mnopqr'),
    timestamp: '9d',
    reactions: { comments: 156, likes: 567, views: 2123, shares: 189 },
    hasImage: false,
  },
  {
    id: 'load-14',
    content:
      'Interoperability between chains is finally seamless! One click, multiple networks ⚡',
    author: 'Interop Engineer',
    walletAddress: '0x456j...abc0',
    handle: '@interopenginer',
    avatar: getAvatarForUser('0x456jkl890pqrstu'),
    timestamp: '9d',
    reactions: { comments: 78, likes: 234, views: 1012, shares: 56 },
    hasImage: false,
  },
  {
    id: 'load-15',
    content:
      'Decentralized storage is replacing traditional cloud! Your data, your control 📦',
    author: 'Storage Pioneer',
    walletAddress: '0x789k...def1',
    handle: '@storagepioneer',
    avatar: getAvatarForUser('0x789klm123stuvwx'),
    timestamp: '10d',
    reactions: { comments: 134, likes: 678, views: 2890, shares: 234 },
    hasImage: false,
  },
  {
    id: 'load-16',
    content:
      'Carbon credit tokenization is solving climate change through blockchain! 🌍',
    author: 'Green Crypto',
    walletAddress: '0xabc1...123k',
    handle: '@greencrypto',
    avatar: getAvatarForUser('0xabc123klm456stu'),
    timestamp: '10d',
    reactions: { comments: 267, likes: 1234, views: 5678, shares: 456 },
    hasImage: true,
    imageUrl: getAssetPath('/posts/1.png'),
  },
  {
    id: 'load-17',
    content:
      'Prediction markets called the election perfectly! Decentralized wisdom wins again 🗳️',
    author: 'Prediction Trader',
    walletAddress: '0xdef2...456l',
    handle: '@predictiontrader',
    avatar: getAvatarForUser('0xdef234lmn567uvw'),
    timestamp: '11d',
    reactions: { comments: 345, likes: 890, views: 4567, shares: 234 },
    hasImage: false,
  },
  {
    id: 'load-18',
    content:
      'Recursive zero-knowledge proofs are enabling infinite scalability! Math is beautiful 🧮',
    author: 'Math Wizard',
    walletAddress: '0x123l...789m',
    handle: '@mathwizard',
    avatar: getAvatarForUser('0x123lmn789wxyz01'),
    timestamp: '11d',
    reactions: { comments: 89, likes: 345, views: 1234, shares: 67 },
    hasImage: false,
  },
  {
    id: 'load-19',
    content:
      'Decentralized social media is gaining momentum! Web3 creators earning more than Web2 📱',
    author: 'Creator Economy',
    walletAddress: '0x456m...abc2',
    handle: '@creatoreconomy',
    avatar: getAvatarForUser('0x456mno890yz0123'),
    timestamp: '12d',
    reactions: { comments: 456, likes: 1567, views: 6789, shares: 678 },
    hasImage: false,
  },
  {
    id: 'load-20',
    content:
      'Quantum-resistant cryptography is already here! Preparing for the quantum future 🔬',
    author: 'Quantum Guard',
    walletAddress: '0x789n...def3',
    handle: '@quantumguard',
    avatar: getAvatarForUser('0x789nop123z01234'),
    timestamp: '12d',
    reactions: { comments: 123, likes: 456, views: 1890, shares: 89 },
    hasImage: false,
  },
];

export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    wallet_address: '0x1234...5678',
    display_name: 'Cases Discussion',
  },
  {
    id: 'user-2',
    wallet_address: '0x2345...6789',
    display_name: 'Alex Crypto',
  },
  {
    id: 'user-3',
    wallet_address: '0x3456...789a',
    display_name: 'Maria DeFi',
  },
  { id: 'user-4', wallet_address: '0x4567...89ab', display_name: 'Bob NFT' },
  {
    id: 'user-5',
    wallet_address: '0x5678...9abc',
    display_name: 'Sarah Web3',
  },
  {
    id: 'user-6',
    wallet_address: '0x6789...bcde',
    display_name: 'Tom Trader',
  },
  {
    id: 'user-7',
    wallet_address: '0x789a...cdef',
    display_name: 'Lisa Luna',
  },
];

export const mockResponses: string[] = [
  'Absolutely agree!',
  'Interesting point',
  'Let me think about this',
  'Good idea',
  'Makes sense',
  'I see what you mean',
  'That could work',
  'Nice perspective',
  'Worth considering',
  'Solid reasoning',
  'True that',
  'Exactly!',
  'I disagree',
  'Not sure about that',
  'Can you elaborate?',
  'Sounds good',
  "Let's do it",
  'Maybe later',
  "I'm in",
  'Count me out',
  'What do you think?',
  'This is exciting!',
  'Could be risky though',
  'Need more research',
  'I love this idea',
  'Not my cup of tea',
  'Brilliant suggestion',
  'Have you tried this before?',
  'Seems legit',
  'Red flag for me',
  'To the moon! 🚀',
  'HODL strong',
  'Diamond hands 💎',
  'Paper hands detected',
  'This is the way',
  'Bullish on this',
  'Bearish vibes',
  'WAGMI',
  'LFG!',
  'Wen moon?',
];

export const createMockChats = (walletAddress?: string): Chat[] => [
  {
    id: 'chat-1',
    name: '1bp5...0x15',
    wallet_address: '0x1bp5...0x15',
    lastMessage: 'Some are looking good too',
    messages: [
      {
        id: 'msg-1-1',
        content: 'GM! Ready for trading?',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-1-2',
        content: 'Always ready! What are you looking at?',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 3500000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-1-3',
        content: 'ETH is looking bullish today',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 3400000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-1-4',
        content: 'I agree, volume is picking up',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 3300000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-1-5',
        content: 'What about altcoins?',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 3200000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-1-6',
        content: 'Some are looking good too',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 3100000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-1-7',
        content: 'MATIC is pumping hard!',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 3000000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-1-8',
        content: 'Saw that too, up 15% today',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 2900000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-1-9',
        content: 'To the moon! 🚀',
        sender_id: 'user-5',
        created_at: new Date(Date.now() - 2800000).toISOString(),
        sender: mockUsers[4],
      },
      {
        id: 'msg-1-10',
        content: 'Anyone buying the dip on LINK?',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 2700000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-1-11',
        content: 'Already loaded my bags',
        sender_id: 'user-6',
        created_at: new Date(Date.now() - 2600000).toISOString(),
        sender: mockUsers[5],
      },
      {
        id: 'msg-1-12',
        content: 'Diamond hands 💎',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 2500000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
    ],
  },
  {
    id: 'chat-2',
    name: 'Cases Discussion',
    wallet_address: '0xCases...Disc',
    lastMessage: 'Count me in! 🚀',
    messages: [
      {
        id: 'msg-2-1',
        content: 'Hey everyone! Welcome to the discussion',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-2-2',
        content: 'Thanks for setting this up!',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 7100000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-2-3',
        content: 'Clear beats clever.',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 600000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-2-4',
        content: 'Maybe we test both?',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 580000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-2-5',
        content: 'Gut feeling says clarity wins.',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 560000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-2-6',
        content: 'Gut feeling says clarity wins.',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 540000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-2-7',
        content: 'Bet',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 520000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-2-8',
        content: 'meow-meow',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 500000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-2-9',
        content: 'meow-meow',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 490000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-2-10',
        content: 'meow-meow',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 485000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-2-11',
        content:
          'Lorem ipsum dolor sit amet consectetur. Proin at finibus mi libero consequat elementum. Quis arcu dolor porttitor in risus feugiat at tristique',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 480000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-2-12',
        content: 'Lorem ipsum dolor sit amet consectetur.',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 460000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-2-13',
        content: 'This is getting interesting',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 440000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-2-14',
        content: 'I think we should consider all options',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 420000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-2-15',
        content: 'What do you think about the new proposal?',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 400000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-2-16',
        content: 'Looks promising to me',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 380000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-2-17',
        content: 'Need more details though',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 360000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-2-18',
        content: 'I can provide more info later',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 340000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-2-19',
        content: 'That would be great!',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 320000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-2-20',
        content: 'Looking forward to it',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 300000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-2-21',
        content: 'This could be a game changer',
        sender_id: 'user-5',
        created_at: new Date(Date.now() - 280000).toISOString(),
        sender: mockUsers[4],
      },
      {
        id: 'msg-2-22',
        content: 'Absolutely agree!',
        sender_id: 'user-6',
        created_at: new Date(Date.now() - 260000).toISOString(),
        sender: mockUsers[5],
      },
      {
        id: 'msg-2-23',
        content: 'What timeline are we looking at?',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 240000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-2-24',
        content: 'Probably next quarter',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 220000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-2-25',
        content: 'Perfect timing then',
        sender_id: 'user-7',
        created_at: new Date(Date.now() - 200000).toISOString(),
        sender: mockUsers[6],
      },
      {
        id: 'msg-2-26',
        content: 'Count me in! 🚀',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 180000).toISOString(),
        sender: mockUsers[1],
      },
    ],
  },
  {
    id: 'chat-3',
    name: 'DeFi Traders',
    wallet_address: '0xDeFi...Trad',
    lastMessage: 'Always DYOR before investing',
    messages: [
      {
        id: 'msg-3-1',
        content: 'Check out this new yield farm!',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-3-2',
        content: 'What are the APY rates?',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 1700000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-3-3',
        content: 'Around 150% APY right now',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 1600000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-3-4',
        content: 'Sounds too good to be true',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 1500000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-3-5',
        content: 'Could be risky though',
        sender_id: 'user-5',
        created_at: new Date(Date.now() - 1450000).toISOString(),
        sender: mockUsers[4],
      },
      {
        id: 'msg-3-6',
        content: 'What protocol is it?',
        sender_id: 'user-6',
        created_at: new Date(Date.now() - 1440000).toISOString(),
        sender: mockUsers[5],
      },
      {
        id: 'msg-3-7',
        content: 'Some new fork of Uniswap',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 1430000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-3-8',
        content: 'Red flag for me',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 1420000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-3-9',
        content: 'I agree with caution',
        sender_id: 'user-7',
        created_at: new Date(Date.now() - 1410000).toISOString(),
        sender: mockUsers[6],
      },
      {
        id: 'msg-3-10',
        content: 'Always DYOR before investing',
        sender_id: 'user-5',
        created_at: new Date(Date.now() - 1400000).toISOString(),
        sender: mockUsers[4],
      },
    ],
  },
  {
    id: 'chat-4',
    name: 'NFT Collectors',
    wallet_address: '0xNFT...Coll',
    lastMessage: 'Bullish on this collection',
    messages: [
      {
        id: 'msg-4-1',
        content: 'New drop coming soon!',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 900000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-4-2',
        content: 'Which collection?',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 800000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-4-3',
        content: 'CryptoPunks derivative',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 700000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-4-4',
        content: 'Mint price?',
        sender_id: 'user-2',
        created_at: new Date(Date.now() - 600000).toISOString(),
        sender: mockUsers[1],
      },
      {
        id: 'msg-4-5',
        content: '0.1 ETH per NFT',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 500000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-4-6',
        content: 'That seems reasonable',
        sender_id: 'user-1',
        created_at: new Date(Date.now() - 450000).toISOString(),
        sender: mockUsers[0],
      },
      {
        id: 'msg-4-7',
        content: 'Art looks decent too',
        sender_id: 'user-3',
        created_at: new Date(Date.now() - 400000).toISOString(),
        sender: mockUsers[2],
      },
      {
        id: 'msg-4-8',
        content: 'Team is doxxed?',
        sender_id: 'user-5',
        created_at: new Date(Date.now() - 350000).toISOString(),
        sender: mockUsers[4],
      },
      {
        id: 'msg-4-9',
        content: 'Yes, all verified',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 300000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-4-10',
        content: 'Utility planned?',
        sender_id: 'current-user',
        created_at: new Date(Date.now() - 250000).toISOString(),
        sender: {
          id: 'current-user',
          wallet_address: walletAddress || '0x5B...42A8',
          display_name: 'You',
        },
      },
      {
        id: 'msg-4-11',
        content: 'Gaming integration coming',
        sender_id: 'user-4',
        created_at: new Date(Date.now() - 200000).toISOString(),
        sender: mockUsers[3],
      },
      {
        id: 'msg-4-12',
        content: 'Bullish on this collection',
        sender_id: 'user-6',
        created_at: new Date(Date.now() - 150000).toISOString(),
        sender: mockUsers[5],
      },
    ],
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'mock-1',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0x8ba1f109551bd432803012645hac136c',
    amount: '1500',
    token: 'HUSHR',
    network: 'Ethereum',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    hash: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: 'mock-2',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    amount: '50',
    token: 'USDC',
    network: 'Polygon',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    hash: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
  {
    id: 'mock-3',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0x9876543210fedcba9876543210fedcba98765432',
    amount: '1500',
    token: 'USDT',
    network: 'BSC',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    hash: '0xfedcba0987654321fedcba0987654321fedcba09',
  },
  {
    id: 'mock-4',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0x1122334455667788991234567890123456789abc',
    amount: '5',
    token: 'BNB',
    network: 'BSC',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    hash: '0x11223344556677889912345678901234567890ab',
  },
  {
    id: 'mock-5',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0xaa11bb22cc33dd44ee55ff6677889900aabbccdd',
    amount: '0.0025',
    token: 'ETH',
    network: 'Ethereum',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    hash: '0xaa11bb22cc33dd44ee55ff6677889900aabbccdd',
  },
  {
    id: 'mock-6',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0xdeadbeefcafebabe1234567890123456789abcde',
    amount: '200',
    token: 'MATIC',
    network: 'Polygon',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    hash: '0xdeadbeefcafebabe1234567890123456789abcde',
  },
  {
    id: 'mock-7',
    from: '0x742d35cc6cf5cf4c4e2ec4b4c9c7e8d3e9a2f1c0',
    to: '0x1111222233334444555566667777888899990000',
    amount: '100',
    token: 'USDC',
    network: 'Arbitrum',
    status: 'failed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
  },
];

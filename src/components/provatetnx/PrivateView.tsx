import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTransactions } from '../../hooks/useTransactions';
import {
  TokenDropdown,
  NetworkDropdown,
  PrivacyDropdown,
  GasDropdown,
} from '../dropdowns';
import { Token, Network, popularTokens, networks } from '../../lib/mockData';

const PrivateView: React.FC = () => {
  const { walletAddress } = useAuth();
  const { pendingTransactions, addTransaction, updateTransactionStatus } =
    useTransactions();

  const [fromAmount, setFromAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
  const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
  const [showFromNetworkDropdown, setShowFromNetworkDropdown] = useState(false);
  const [showToNetworkDropdown, setShowToNetworkDropdown] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);
  const [showGasDropdown, setShowGasDropdown] = useState(false);
  const [selectedPrivacyLevel, setSelectedPrivacyLevel] =
    useState('High Privacy');
  const [selectedGasPriority, setSelectedGasPriority] = useState('Fast');
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const [selectedFromToken, setSelectedFromToken] = useState<Token>({
    symbol: 'HUSHR',
    name: 'Hushr Token',
    icon: '/favicon.png',
    balance: '1,250.45',
    usdValue: '$2,500.90',
  });

  const [selectedToToken, setSelectedToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/coins/usdc.svg',
    balance: '500.00',
    usdValue: '$500.00',
  });

  const [selectedFromNetwork, setSelectedFromNetwork] = useState<Network>({
    id: 'ethereum',
    name: 'Ethereum',
    icon: '/networks/eth.png',
    chainId: 1,
  });

  const [selectedToNetwork, setSelectedToNetwork] = useState<Network>({
    id: 'polygon',
    name: 'Polygon',
    icon: '/networks/poligon.png',
    chainId: 137,
  });

  const getTokenPrice = (token: Token): number => {
    const balance = parseFloat(token.balance.replace(/,/g, ''));
    const usdValue = parseFloat(token.usdValue.replace(/[$,]/g, ''));
    return balance > 0 ? usdValue / balance : 0;
  };

  const calculateToAmount = (): string => {
    if (!fromAmount || fromAmount === '0') return '0';

    const fromPrice = getTokenPrice(selectedFromToken);
    const toPrice = getTokenPrice(selectedToToken);

    if (fromPrice === 0 || toPrice === 0) return '0';

    const fromAmountNum = parseFloat(fromAmount);
    const fromValueUSD = fromAmountNum * fromPrice;
    const toAmountNum = fromValueUSD / toPrice;

    return toAmountNum.toFixed(6);
  };

  const handleMaxAmount = () => {
    const balanceStr = selectedFromToken.balance.replace(/,/g, '');
    const balance = parseFloat(balanceStr);
    if (!isNaN(balance)) {
      setFromAmount(balance.toString());
    }
  };

  const handleSendTransaction = async () => {
    if (!fromAmount || !recipientAddress || !walletAddress) return;

    setIsTransactionPending(true);

    const transactionData = {
      from: walletAddress,
      to: recipientAddress,
      amount: fromAmount,
      token: selectedFromToken.symbol,
      network: selectedFromNetwork.name,
      status: 'pending' as const,
    };

    const transactionId = addTransaction(transactionData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      updateTransactionStatus(
        transactionId,
        'completed',
        `0x${Math.random().toString(16).substr(2, 64)}`
      );

      setFromAmount('');
      setRecipientAddress('');
    } catch {
      updateTransactionStatus(transactionId, 'failed');
    } finally {
      setIsTransactionPending(false);
    }
  };

  return (
    <div className="w-full border-l min-w-[696px] max-w-[696px] border-r border-hushr-gray lg:border-l lg:border-r border-l-0 border-r-0 hide-scrollbar overflow-y-auto">
      <div className="flex flex-col justify-center items-center min-h-screen p-8 gap-8">
        <div className="flex flex-col gap-8 w-full max-w-[632px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70 font-quicksand font-medium text-base">
                From:
              </span>
              <NetworkDropdown
                networks={networks}
                selectedNetwork={selectedFromNetwork}
                onSelect={setSelectedFromNetwork}
                show={showFromNetworkDropdown}
                onToggle={() =>
                  setShowFromNetworkDropdown(!showFromNetworkDropdown)
                }
              />
            </div>

            <div className="flex items-center px-4 py-3 border border-hushr-green/50 rounded-xl bg-hushr-green/5">
              <span className="text-hushr-green font-quicksand font-medium text-sm">
                {walletAddress
                  ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
                  : 'Connect Wallet'}
              </span>
            </div>

            <div className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent text-white font-quicksand font-semibold text-2xl placeholder:text-white/30 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-white/50 font-quicksand font-medium text-sm">
                    ~$
                    {(
                      parseFloat(fromAmount || '0') *
                      getTokenPrice(selectedFromToken)
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleMaxAmount}
                    className="px-3 py-1 text-hushr-green font-quicksand font-medium text-sm border border-hushr-green/50 rounded-lg hover:bg-hushr-green/10 transition-colors"
                  >
                    MAX
                  </button>
                  <div className="max-w-[280px]">
                    <TokenDropdown
                      tokens={popularTokens}
                      selectedToken={selectedFromToken}
                      onSelect={setSelectedFromToken}
                      show={showFromTokenDropdown}
                      onToggle={() =>
                        setShowFromTokenDropdown(!showFromTokenDropdown)
                      }
                      showBalance={true}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-white/50 font-quicksand">
                  Balance: {selectedFromToken.balance}{' '}
                  {selectedFromToken.symbol}
                </span>
                <span className="text-white/50 font-quicksand">
                  {selectedFromToken.usdValue}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70 font-quicksand font-medium text-base">
                To:
              </span>
              <NetworkDropdown
                networks={networks}
                selectedNetwork={selectedToNetwork}
                onSelect={setSelectedToNetwork}
                show={showToNetworkDropdown}
                onToggle={() =>
                  setShowToNetworkDropdown(!showToNetworkDropdown)
                }
              />
            </div>

            <div className="flex items-center px-4 py-3 border border-white/20 rounded-xl bg-white/5">
              <input
                type="text"
                placeholder="Recipient's address (0x...)"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="bg-transparent text-white font-quicksand font-medium text-sm placeholder:text-white/30 border-none outline-none flex-1"
              />
              <svg
                className="w-5 h-5 text-white/30 ml-2"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_990_828)">
                  <path
                    d="M9.5 7V10H6.5V7H9.5ZM11 5.5H5V11.5H11V5.5ZM9.5 15V18H6.5V15H9.5ZM11 13.5H5V19.5H11V13.5ZM17.5 7V10H14.5V7H17.5ZM19 5.5H13V11.5H19V5.5ZM13 13.5H14.5V15H13V13.5ZM14.5 15H16V16.5H14.5V15ZM16 13.5H17.5V15H16V13.5ZM13 16.5H14.5V18H13V16.5ZM14.5 18H16V19.5H14.5V18ZM16 16.5H17.5V18H16V16.5ZM17.5 15H19V16.5H17.5V15ZM17.5 18H19V19.5H17.5V18ZM21 7.5C20.45 7.5 20 7.05 20 6.5V4.5H18C17.45 4.5 17 4.05 17 3.5C17 2.95 17.45 2.5 18 2.5H21C21.55 2.5 22 2.95 22 3.5V6.5C22 7.05 21.55 7.5 21 7.5ZM22 21.5V18.5C22 17.95 21.55 17.5 21 17.5C20.45 17.5 20 17.95 20 18.5V20.5H18C17.45 20.5 17 20.95 17 21.5C17 22.05 17.45 22.5 18 22.5H21C21.55 22.5 22 22.05 22 21.5ZM3 22.5H6C6.55 22.5 7 22.05 7 21.5C7 20.95 6.55 20.5 6 20.5H4V18.5C4 17.95 3.55 17.5 3 17.5C2.45 17.5 2 17.95 2 18.5V21.5C2 22.05 2.45 22.5 3 22.5ZM2 3.5V6.5C2 7.05 2.45 7.5 3 7.5C3.55 7.5 4 7.05 4 6.5V4.5H6C6.55 4.5 7 4.05 7 3.5C7 2.95 6.55 2.5 6 2.5H3C2.45 2.5 2 2.95 2 3.5Z"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_990_828">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={calculateToAmount()}
                    readOnly
                    className="bg-transparent text-white font-quicksand font-semibold text-2xl placeholder:text-white/30 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-white/50 font-quicksand font-medium text-sm">
                    ~$
                    {(
                      parseFloat(calculateToAmount() || '0') *
                      getTokenPrice(selectedToToken)
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="max-w-[280px] flex-shrink-0">
                  <TokenDropdown
                    tokens={popularTokens}
                    selectedToken={selectedToToken}
                    onSelect={setSelectedToToken}
                    show={showToTokenDropdown}
                    onToggle={() =>
                      setShowToTokenDropdown(!showToTokenDropdown)
                    }
                    showBalance={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-white/50 font-quicksand font-medium text-sm">
                Privacy fee: ~$0.05 • Estimated time: 2-5 minutes
              </span>
              <button
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <span className="text-white/70 font-quicksand font-medium text-sm">
                  Advanced options
                </span>
                <svg
                  className={`w-4 h-4 text-white/50 transition-transform duration-300 ease-in-out ${
                    showAdvancedOptions ? 'rotate-0' : 'rotate-180'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`transition-all duration-300 ease-in-out ${
                showAdvancedOptions
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-white font-quicksand font-semibold text-base">
                  Advanced Options
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 font-quicksand font-medium text-sm">
                      Privacy Level
                    </label>
                    <PrivacyDropdown
                      options={['High Privacy', 'Medium Privacy', 'Standard']}
                      selected={selectedPrivacyLevel}
                      onSelect={setSelectedPrivacyLevel}
                      show={showPrivacyDropdown}
                      onToggle={() =>
                        setShowPrivacyDropdown(!showPrivacyDropdown)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 font-quicksand font-medium text-sm">
                      Gas Priority
                    </label>
                    <GasDropdown
                      options={['Fast', 'Standard', 'Slow']}
                      selected={selectedGasPriority}
                      onSelect={setSelectedGasPriority}
                      show={showGasDropdown}
                      onToggle={() => setShowGasDropdown(!showGasDropdown)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSendTransaction}
              disabled={
                !walletAddress ||
                !recipientAddress ||
                !fromAmount ||
                isTransactionPending
              }
              className="w-full px-8 py-4 bg-hushr-green rounded-xl hover:bg-hushr-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-black font-quicksand font-semibold text-base">
                {isTransactionPending
                  ? 'Sending...'
                  : 'Send Private Transaction'}
              </span>
            </button>
          </div>
        </div>

        {pendingTransactions.length > 0 && (
          <div className="w-full max-w-[632px] mt-8">
            <h3 className="text-white font-quicksand font-semibold text-lg mb-4">
              Pending Transactions
            </h3>
            <div className="flex flex-col gap-3">
              {pendingTransactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        tx.status === 'completed'
                          ? 'bg-hushr-green'
                          : tx.status === 'pending'
                          ? 'bg-yellow-500 animate-pulse'
                          : 'bg-red-500'
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-quicksand font-medium text-sm">
                        {tx.amount} {tx.token} → {tx.to.slice(0, 8)}...
                        {tx.to.slice(-6)}
                      </span>
                      <span className="text-white/50 font-quicksand font-medium text-xs">
                        {tx.network} • {tx.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`font-quicksand font-medium text-xs capitalize ${
                        tx.status === 'completed'
                          ? 'text-hushr-green'
                          : tx.status === 'pending'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {tx.status}
                    </span>
                    {tx.hash && (
                      <span className="text-white/30 font-quicksand font-medium text-xs">
                        {tx.hash.slice(0, 8)}...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateView;

import React from 'react';
import { Token } from '../../lib/mockData';

interface TokenDropdownProps {
  tokens: Token[];
  selectedToken: Token;
  onSelect: (token: Token) => void;
  show: boolean;
  onToggle: () => void;
  showBalance?: boolean;
  dropdownPosition?: 'top' | 'bottom';
}

const TokenDropdown: React.FC<TokenDropdownProps> = ({
  tokens,
  selectedToken,
  onSelect,
  show,
  onToggle,
  showBalance = true,
  dropdownPosition = 'bottom',
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center justify-between gap-2 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors min-w-[280px]"
    >
      <div className="flex items-center gap-3">
        <img
          src={selectedToken.icon}
          alt={selectedToken.symbol}
          className="w-8 h-8 rounded-full"
        />

        <div className="flex flex-col items-start">
          <span className="text-white font-quicksand font-semibold text-base">
            {selectedToken.symbol}
          </span>
          <span className="text-white/50 font-quicksand font-medium text-sm">
            {selectedToken.name}
          </span>
        </div>
      </div>
      <svg
        className={`w-5 h-5 text-white/50 transition-transform duration-300 ease-in-out ${
          show ? 'rotate-180' : ''
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

    {show && (
      <div
        className={`absolute left-0 right-0 bg-black border border-white/20 rounded-xl shadow-lg z-50 max-h-[300px] overflow-hidden overflow-y-auto ${
          dropdownPosition === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
        }`}
      >
        {tokens.map((token) => (
          <button
            key={token.symbol}
            onClick={() => {
              onSelect(token);
              onToggle();
            }}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={token.icon}
                alt={token.symbol}
                className="w-8 h-8 rounded-full"
              />

              <div className="flex flex-col items-start">
                <span className="text-white font-quicksand font-semibold text-base">
                  {token.symbol}
                </span>
                <span className="text-white/50 font-quicksand font-medium text-sm">
                  {token.name}
                </span>
              </div>
            </div>
            {showBalance && (
              <div className="flex flex-col items-end">
                <span className="text-white/70 font-quicksand font-medium text-sm">
                  {token.balance}
                </span>
                <span className="text-white/50 font-quicksand font-medium text-sm">
                  {token.usdValue}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default TokenDropdown;

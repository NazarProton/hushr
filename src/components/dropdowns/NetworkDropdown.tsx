import React from 'react';
import { Network } from '../../lib/mockData';

interface NetworkDropdownProps {
  networks: Network[];
  selectedNetwork: Network;
  onSelect: (network: Network) => void;
  show: boolean;
  onToggle: () => void;
}

const NetworkDropdown: React.FC<NetworkDropdownProps> = ({
  networks,
  selectedNetwork,
  onSelect,
  show,
  onToggle,
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center justify-between gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors w-[168px]"
    >
      <div className="flex items-center gap-2">
        <img
          src={selectedNetwork.icon}
          alt={selectedNetwork.name}
          className="w-6 h-6"
        />
        <span className="text-white/70 font-quicksand font-medium text-base">
          {selectedNetwork.name}
        </span>
      </div>
      <svg
        className={`w-4 h-4 text-white/50 transition-transform duration-300 ease-in-out ${
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
      <div className="absolute top-full right-0 w-[168px] mt-2 bg-black border max-h-[200px] border-white/20 rounded-xl shadow-lg z-40 overflow-hidden overflow-y-auto">
        {networks.map((network) => (
          <button
            key={network.id}
            onClick={() => {
              onSelect(network);
              onToggle();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors"
          >
            <img src={network.icon} alt={network.name} className="w-6 h-6" />
            <span className="text-white font-quicksand font-medium text-base">
              {network.name}
            </span>
          </button>
        ))}
      </div>
    )}
  </div>
);

export default NetworkDropdown;

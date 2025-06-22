import React from 'react';

interface GasDropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  show: boolean;
  onToggle: () => void;
}

const GasDropdown: React.FC<GasDropdownProps> = ({
  options,
  selected,
  onSelect,
  show,
  onToggle,
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-quicksand text-sm hover:bg-white/20 transition-colors focus:outline-none focus:border-hushr-green/50 flex items-center justify-between relative"
    >
      <span>{selected}</span>
      <svg
        className={`w-4 h-4 text-white/50 absolute right-4 transition-transform duration-300 ease-in-out ${
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
      <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-white/20 rounded-lg shadow-lg z-[100] overflow-hidden">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onSelect(option);
              onToggle();
            }}
            className="w-full px-4 py-3 text-left text-white font-quicksand text-sm hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <span>{option}</span>
            {selected === option && (
              <svg
                className="w-4 h-4 text-hushr-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default GasDropdown;

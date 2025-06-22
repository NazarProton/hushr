import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';

const PrivateRightSidebar: React.FC = () => {
  const { completedTransactions } = useTransactions();

  const recentTransactions = completedTransactions
    .filter((tx) => tx.status === 'completed')
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col items-end py-8 gap-8 w-[280px] h-screen">
      <div className="flex justify-end items-center gap-4 w-[265px] h-[57px]">
        <div className="flex items-center gap-2 w-[46px] h-[25px]">
          <span className="text-hushr-green font-quicksand font-medium text-xl leading-[25px]">
            +21%
          </span>
        </div>

        <button className="flex justify-center items-center px-6 py-4 gap-2 w-[203px] h-[57px] border border-hushr-green rounded-2xl hover:bg-hushr-green/10 transition-colors">
          <img width={24} height={24} src="/favicon.png" alt="Buy $hushr" />
          <span className="text-hushr-green font-quicksand font-semibold text-xl leading-[25px]">
            Buy $hushr
          </span>
        </button>
      </div>

      <div className="flex flex-col items-start px-8 py-8 gap-8 w-[280px] border border-white/25 rounded-2xl">
        <h2 className="text-white font-quicksand font-semibold text-2xl leading-[30px]">
          Last TXs
        </h2>

        <div className="flex flex-col items-start gap-4 w-[216px]">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col items-start w-full hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="text-white font-quicksand font-semibold text-xl leading-[25px]">
                    {tx.amount} {tx.token}
                  </span>
                  <svg
                    className="w-6 h-6 text-hushr-green opacity-50 hover:opacity-100 transition-opacity"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 w-full text-sm">
                  <span className="text-white/50 font-quicksand font-medium">
                    {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                  </span>
                  <svg
                    className="w-4 h-4 text-white/50 transform rotate-180"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                  </svg>
                  <span className="text-white/50 font-quicksand font-medium">
                    {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full text-xs mt-1">
                  <span className="text-white/30 font-quicksand font-medium">
                    {tx.network}
                  </span>
                  <span className="text-white/30 font-quicksand font-medium">
                    {tx.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-8 gap-2">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <span className="text-white/50 font-quicksand font-medium text-sm text-center">
                No completed transactions yet
              </span>
              <span className="text-white/30 font-quicksand font-medium text-xs text-center">
                Your transaction history will appear here
              </span>
            </div>
          )}
        </div>

        {recentTransactions.length > 0 && (
          <div className="flex items-center gap-2 w-full">
            <span className="text-hushr-green font-quicksand font-semibold text-base leading-5 cursor-pointer hover:text-hushr-green/80 transition-colors">
              Show more ({completedTransactions.length})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateRightSidebar;

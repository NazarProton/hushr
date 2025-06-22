import React from 'react';

interface Inscription {
  id: string;
  name: string;
  type: string;
  size: string;
  inscriptionId: string;
  timestamp: Date;
}

interface InscribeRightSidebarProps {
  recentInscriptions: Inscription[];
}

const InscribeRightSidebar: React.FC<InscribeRightSidebarProps> = ({
  recentInscriptions,
}) => {
  return (
    <div className="flex flex-col items-end py-8 gap-8 w-[280px] h-screen">
      {/* Header with Progress and Buy Button - exactly as in Figma */}
      <div className="flex justify-end items-center gap-4 w-[265px] h-[57px]">
        {/* Progress */}
        <div className="flex items-center gap-2 w-[46px] h-[25px]">
          <span className="text-hushr-green font-quicksand font-medium text-xl leading-[25px]">
            +21%
          </span>
        </div>

        {/* Buy Button */}
        <button className="flex justify-center items-center px-6 py-4 gap-2 w-[203px] h-[57px] border border-hushr-green rounded-2xl hover:bg-hushr-green/10 transition-colors">
          <img width={24} height={24} src="/favicon.png" alt="Buy $hushr" />
          <span className="text-hushr-green font-quicksand font-semibold text-xl leading-[25px]">
            Buy $hushr
          </span>
        </button>
      </div>

      {/* Recently Inscribed Section */}
      <div className="flex flex-col items-start px-8 py-8 gap-8 w-[280px] h-[468px] border border-white/25 rounded-2xl">
        {/* Title */}
        <h2 className="text-white font-quicksand font-semibold text-2xl leading-[30px] w-[216px] h-[30px]">
          Recently Inscribed
        </h2>

        {/* Inscriptions List */}
        <div className="flex flex-col items-start gap-4 w-[216px] h-[289px]">
          {recentInscriptions.slice(0, 5).map((inscription) => (
            <div
              key={inscription.id}
              className="flex flex-col items-start w-[216px] h-[45px]"
            >
              {/* Name and Type */}
              <div className="flex items-center justify-between w-full h-[25px]">
                <span className="text-white font-quicksand font-semibold text-xl leading-[25px] truncate flex-1 mr-2">
                  {inscription.name}
                </span>
                <svg
                  className="w-6 h-6 text-hushr-green opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
              </div>

              {/* Type and Size */}
              <div className="flex items-center gap-2 w-[216px] h-5">
                <span className="text-white/50 font-quicksand font-medium text-base leading-5">
                  {inscription.type} • {inscription.size}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        <div className="flex items-center gap-2 w-[216px] h-5">
          <span className="text-hushr-green font-quicksand font-semibold text-base leading-5 w-[86px] h-5 cursor-pointer hover:text-hushr-green/80 transition-colors">
            Show more
          </span>
        </div>
      </div>
    </div>
  );
};

export default InscribeRightSidebar;

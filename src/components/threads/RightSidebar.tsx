import React from 'react';

const RightSidebar: React.FC = () => {
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

      {/* Trending Section - exactly as in Figma */}
      <div className="flex flex-col items-start px-8 py-8 gap-8 w-[280px] border border-white/25 rounded-2xl">
        {/* Title */}
        <h2 className="text-white font-quicksand font-semibold text-2xl leading-[30px] w-[216px] h-[30px]">
          Trending now
        </h2>

        {/* Trending List */}
        <div className="flex flex-col items-start gap-8 w-[216px]">
          {[
            { hashtag: '#memes', count: '1m posts' },
            { hashtag: '#Cryptocats', count: '1m posts' },
            { hashtag: '#Investments', count: '1m posts' },
            { hashtag: '#wales_go', count: '1m posts' },
            { hashtag: '#scammed', count: '1m posts' },
          ].map((trend, index) => (
            <div
              key={index}
              className="flex flex-col w-[216px] h-[45px] hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
            >
              {/* Hashtag */}
              <div className="w-[216px] h-[25px]">
                <span className="text-white font-quicksand font-semibold text-xl leading-[25px]">
                  {trend.hashtag}
                </span>
              </div>
              {/* Count */}
              <div className="w-[66px] h-5">
                <span className="text-white/50 font-quicksand font-medium text-base leading-5">
                  {trend.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        <div className="flex items-center gap-2 w-[245px] h-5">
          <span className="text-hushr-green font-quicksand font-semibold text-base leading-5 w-[86px] h-5 cursor-pointer hover:text-hushr-green/80 transition-colors">
            Show more
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

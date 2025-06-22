import React from 'react';
import { getAssetPath } from '../../lib/paths';
import { getAvatarForUser } from '../../lib/avatars';

const ProfileRightSidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-end py-8 gap-8 w-[280px] h-screen">
      {/* Header with Progress and Buy Button */}
      <div className="flex justify-end items-center gap-4 w-[265px] h-[57px]">
        {/* Progress */}
        <div className="flex items-center gap-2 w-[46px] h-[25px]">
          <span className="text-hushr-green font-quicksand font-medium text-xl leading-[25px]">
            +21%
          </span>
        </div>

        {/* Buy Button */}
        <button className="flex justify-center items-center px-6 py-4 gap-2 w-[203px] h-[57px] border border-hushr-green rounded-2xl hover:bg-hushr-green/10 transition-colors">
          <img
            width={24}
            height={24}
            src={getAssetPath('/favicon.png')}
            alt="Buy $hushr"
          />
          <span className="text-hushr-green font-quicksand font-semibold text-xl leading-[25px]">
            Buy $hushr
          </span>
        </button>
      </div>

      {/* Profile Activity Section */}
      <div className="flex flex-col items-start px-8 py-8 gap-8 w-[280px] border border-white/25 rounded-2xl">
        {/* Title */}
        <h2 className="text-white font-quicksand font-semibold text-2xl leading-[30px]">
          Activity
        </h2>

        {/* Activity List */}
        <div className="flex flex-col items-start gap-4 w-[216px]">
          {[
            { action: 'Posts created', count: '12', time: '2h ago' },
            { action: 'Messages sent', count: '34', time: '1d ago' },
            { action: 'Likes received', count: '156', time: '3d ago' },
            { action: 'Profile views', count: '89', time: '1w ago' },
            { action: 'Followers gained', count: '23', time: '2w ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex flex-col w-[216px] h-[60px] hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-white font-quicksand font-medium text-sm">
                  {activity.action}
                </span>
                <span className="text-hushr-green font-quicksand font-semibold text-sm">
                  {activity.count}
                </span>
              </div>
              <span className="text-white/50 font-quicksand text-xs">
                {activity.time}
              </span>
            </div>
          ))}
        </div>

        {/* Show More */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-hushr-green font-quicksand font-semibold text-base leading-5 cursor-pointer hover:text-hushr-green/80 transition-colors">
            View all activity
          </span>
        </div>
      </div>

      {/* Recent Connections */}
      <div className="flex flex-col items-start px-8 py-8 gap-6 w-[280px] border border-white/25 rounded-2xl">
        <h2 className="text-white font-quicksand font-semibold text-xl">
          Recent Connections
        </h2>

        <div className="flex flex-col gap-3 w-full">
          {[
            { address: '0x1234...5678', name: 'Alex Crypto' },
            { address: '0x2345...6789', name: 'Maria DeFi' },
            { address: '0x3456...789a', name: 'Bob NFT' },
          ].map((connection, index) => (
            <div
              key={index}
              className="flex items-center gap-3 w-full p-2 -m-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={getAvatarForUser(connection.address)}
                  alt={connection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-quicksand font-medium text-sm truncate">
                  {connection.name}
                </div>
                <div className="text-white/50 font-quicksand text-xs truncate">
                  {connection.address}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Connections */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-hushr-green font-quicksand font-semibold text-base leading-5 cursor-pointer hover:text-hushr-green/80 transition-colors">
            View all connections
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightSidebar;

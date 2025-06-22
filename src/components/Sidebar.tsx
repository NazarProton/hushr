import React from 'react';
import { getAvatarForUser } from '../lib/avatars';
import { useAuth } from '../hooks/useAuth';
import { getAssetPath } from '../lib/paths';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasMessagesNotification: boolean;
  isConnected: boolean;
  iconOnly?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  hasMessagesNotification,
  isConnected,
  iconOnly = false,
}) => {
  const { walletAddress, connectWallet } = useAuth();

  const handleProfileClick = () => {
    if (!isConnected) {
      connectWallet();
    } else {
      onTabChange('profile');
    }
  };

  const menuItems = [
    {
      id: 'threads',
      label: 'Threads',
      iconPath: '/sidebar/threads.svg',
      requiresAuth: false,
    },
    {
      id: 'messages',
      label: 'Messages',
      iconPath: '/sidebar/messages.svg',
      requiresAuth: true,
    },
    {
      id: 'inscribe',
      label: 'Inscribe',
      iconPath: '/sidebar/inscribe.svg',
      requiresAuth: true,
    },
    {
      id: 'private',
      label: 'Private TXs',
      iconPath: '/sidebar/privatetxs.svg',
      requiresAuth: true,
    },
  ];

  const userAvatar = walletAddress
    ? getAvatarForUser(walletAddress)
    : getAvatarForUser('default');

  if (iconOnly) {
    return (
      <div className="flex flex-col justify-between h-full py-8 px-2">
        <div className="flex justify-center mb-8">
          <a href="/" className="w-8 h-8 flex items-center justify-center">
            <img
              src={getAssetPath('/logo.svg')}
              alt="Hushr"
              className="w-8 h-8 xl:block hidden object-contain"
            />
            <img
              src={getAssetPath('/favicon.png')}
              alt="Hushr"
              className="w-8 h-8 xl:hidden block object-contain"
            />
          </a>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="relative space-y-4">
            {menuItems.some((item) => item.id === activeTab) && (
              <div
                className="absolute -left-2 -right-2 h-16 bg-white/10 rounded-2xl transition-all duration-300 ease-in-out pointer-events-none"
                style={{
                  transform: `translateY(${
                    menuItems.findIndex((item) => item.id === activeTab) * 80 +
                    15
                  }px)`,
                }}
              />
            )}

            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const isLocked = item.requiresAuth && !isConnected;

              return (
                <div key={item.id} className="relative flex justify-center">
                  <button
                    onClick={() => onTabChange(item.id)}
                    disabled={isLocked}
                    className={`
                      relative group z-10 flex items-center justify-center w-14 h-16 rounded-2xl
                      transition-all duration-200
                      ${
                        isActive
                          ? 'text-white'
                          : isLocked
                          ? 'text-white/50 cursor-not-allowed pointer-events-none'
                          : 'text-white hover:text-hushr-green hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img
                        src={getAssetPath(item.iconPath)}
                        alt={item.label}
                        className={`w-8 h-8 ${
                          isActive
                            ? 'grayscale'
                            : 'grayscale group-hover:grayscale-0'
                        }`}
                      />
                    </div>
                    {item.id === 'messages' && hasMessagesNotification && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-hushr-green rounded-full" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative group">
            <button
              onClick={handleProfileClick}
              className={`
                w-10 h-10 rounded-full overflow-hidden transition-all duration-200
                ${
                  activeTab === 'profile'
                    ? 'ring-2 ring-hushr-green'
                    : 'hover:ring-2 hover:ring-white/50'
                }
              `}
            >
              <img
                src={userAvatar}
                alt={isConnected ? 'Profile' : 'Connect Wallet'}
                className="w-full h-full object-cover"
              />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {isConnected ? 'Profile' : 'Connect Wallet'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full py-8 gap-[26px]">
      <div className="flex justify-center">
        <div className="w-[127px] h-14 flex items-center justify-center">
          <img
            src={getAssetPath('/logo.svg')}
            alt="Hushr"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col w-44 h-64 space-y-0 relative">
          {menuItems.some((item) => item.id === activeTab) && (
            <div
              className="absolute -left-4 -right-8 w-52 h-16 bg-white/10 rounded-2xl transition-all duration-300 ease-in-out pointer-events-none"
              style={{
                transform: `translateY(${
                  menuItems.findIndex((item) => item.id === activeTab) * 64
                }px)`,
              }}
            />
          )}

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            const isLocked = item.requiresAuth && !isConnected;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => onTabChange(item.id)}
                  disabled={isLocked}
                  className={`
                    relative group z-10 flex items-center gap-4 w-44 h-16 px-0 py-4
                    font-quicksand font-semibold text-xl text-left
                    transition-all duration-200
                    ${
                      isActive
                        ? 'text-white'
                        : isLocked
                        ? 'text-white/50 cursor-not-allowed  pointer-events-none'
                        : 'text-white hover:text-hushr-green'
                    }
                  `}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src={getAssetPath(item.iconPath)}
                      alt={item.label}
                      className={`w-8 h-8 ${
                        isActive
                          ? 'grayscale'
                          : 'grayscale group-hover:grayscale-0'
                      }`}
                    />
                  </div>
                  <span className="leading-[25px]">{item.label}</span>
                  {item.id === 'messages' && hasMessagesNotification && (
                    <div className="w-2 h-2 bg-hushr-green rounded-full ml-auto" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {activeTab === 'profile' && (
            <div className="absolute -left-4 -right-8 top-0 w-52 h-16 bg-white/10 rounded-2xl" />
          )}

          <button
            onClick={handleProfileClick}
            className={`
              relative group z-10 flex items-center rounded-[10px] gap-4 w-44 h-16 px-0 py-4
              font-quicksand font-semibold text-xl text-left
              transition-all duration-200
              ${activeTab === 'profile' ? 'text-white' : 'text-white'}
                `}
          >
            <div className="absolute -left-4 -right-8 top-0 border group-hover:border-white w-52 h-16 border border-hushr-grayLess rounded-2xl transition-all duration-200" />
            {isConnected && (
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={userAvatar}
                    alt={isConnected ? 'Profile' : 'Connect Wallet'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <span
              className={`leading-[25px] whitespace-nowrap ${
                isConnected ? '' : 'text-center w-full'
              }`}
            >
              {isConnected ? 'Profile' : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

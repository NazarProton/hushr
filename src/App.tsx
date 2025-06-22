import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MessagesView from './components/messages/MessagesView';
import RightSidebar from './components/threads/RightSidebar';
import PrivateRightSidebar from './components/provatetnx/PrivateRightSidebar';
import InscribeRightSidebar from './components/inscribe/InscribeRightSidebar';
import ProfileRightSidebar from './components/profile/ProfileRightSidebar';
import ChatSidebar from './components/messages/ChatSidebar';
import ThreadsView from './components/threads/ThreadsView';
import InscribeView from './components/inscribe/InscribeView';
import PrivateView from './components/provatetnx/PrivateView';
import ProfileView from './components/profile/ProfileView';
import LoginView from './components/LoginView';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { TransactionProvider } from './contexts/TransactionContext';

interface Inscription {
  id: string;
  name: string;
  type: string;
  size: string;
  inscriptionId: string;
  timestamp: Date;
}

const AppContent: React.FC = () => {
  const { isConnected } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('threads');
  const [showMessagesNotification, setShowMessagesNotification] =
    useState(false);
  const [selectedChatId, setSelectedChatId] = useState('chat-2');
  const [wasDisconnected, setWasDisconnected] = useState(false);

  const [recentInscriptions, setRecentInscriptions] = useState<Inscription[]>([
    {
      id: '1',
      name: 'tb1p...e3yz',
      type: 'json',
      size: '1.23 Mb',
      inscriptionId: 'i2b4f8a9c1d2e3f4',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '2',
      name: 'tb1q...vrny',
      type: 'text',
      size: '0.45 Kb',
      inscriptionId: 'i7e9f2b1c4d8a5b2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '3',
      name: 'mqd...hb2f',
      type: 'image',
      size: '2.1 Mb',
      inscriptionId: 'i3c5d6e7f8a9b1c2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: '4',
      name: '2N7x...zWCs',
      type: 'video',
      size: '15.7 Mb',
      inscriptionId: 'i9f1a2b3c4d5e6f7',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: '5',
      name: 'tb1p...e3yz',
      type: 'audio',
      size: '4.2 Mb',
      inscriptionId: 'i8e7d6c5b4a3f2e1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  ]);

  React.useEffect(() => {
    if (!isConnected && activeTab !== 'threads') {
      setWasDisconnected(true);
    } else if (isConnected) {
      setWasDisconnected(false);
    }
  }, [isConnected, activeTab]);

  const renderMainContent = () => {
    if (!isConnected && activeTab !== 'threads') {
      return (
        <LoginView
          onTabChange={setActiveTab}
          message={
            wasDisconnected
              ? 'Wallet disconnected. Please connect to access this feature.'
              : undefined
          }
        />
      );
    }

    switch (activeTab) {
      case 'threads':
        return <ThreadsView />;
      case 'messages':
        return (
          <MessagesView
            onNotificationChange={setShowMessagesNotification}
            selectedChatId={selectedChatId}
          />
        );
      case 'inscribe':
        return <InscribeView onInscriptionCreate={setRecentInscriptions} />;
      case 'private':
        return <PrivateView />;
      case 'profile':
        return <ProfileView onTabChange={setActiveTab} />;
      default:
        return <ThreadsView />;
    }
  };

  const showRightSidebar =
    activeTab === 'threads' ||
    activeTab === 'messages' ||
    activeTab === 'private' ||
    activeTab === 'inscribe' ||
    activeTab === 'profile';

  return (
    <div className="min-h-screen bg-black font-quicksand prevent-scroll-shift">
      <div className="hidden lg:flex justify-center min-h-screen">
        <div className="w-full max-w-[1280px] flex justify-center">
          <div className="w-44 xl:w-44 lg:w-16 mr-2 xl:mr-8 flex-shrink-0">
            <div className="sticky top-0 h-screen">
              <div className="xl:block hidden h-full">
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  hasMessagesNotification={showMessagesNotification}
                  isConnected={isConnected}
                  iconOnly={false}
                />
              </div>
              <div className="xl:hidden lg:block hidden h-full">
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  hasMessagesNotification={showMessagesNotification}
                  isConnected={isConnected}
                  iconOnly={true}
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex justify-center">
            <div className="w-full max-w-[696px]">{renderMainContent()}</div>
          </div>

          {showRightSidebar && (
            <div className="hidden lg:block w-[280px] ml-8 flex-shrink-0">
              <div className="sticky top-0 h-screen">
                {activeTab === 'messages' ? (
                  <ChatSidebar
                    selectedChatId={selectedChatId}
                    onChatSelect={setSelectedChatId}
                  />
                ) : activeTab === 'inscribe' ? (
                  <InscribeRightSidebar
                    recentInscriptions={recentInscriptions}
                  />
                ) : activeTab === 'private' ? (
                  <PrivateRightSidebar />
                ) : activeTab === 'profile' ? (
                  <ProfileRightSidebar />
                ) : (
                  <RightSidebar />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden block">
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">{renderMainContent()}</div>

          <div className="bg-black border-t border-hushr-gray">
            <div className="flex justify-around py-3 relative">
              <div
                className="absolute top-3 bottom-3 bg-white/10 rounded-lg transition-all duration-300 ease-in-out pointer-events-none"
                style={{
                  width: '20%',
                  left: `${
                    [
                      'threads',
                      'messages',
                      'private',
                      'inscribe',
                      'profile',
                    ].findIndex((id) => id === activeTab) * 20
                  }%`,
                }}
              />

              {[
                { id: 'threads', icon: '🧵', label: 'Threads' },
                { id: 'messages', icon: '💬', label: 'Messages' },
                { id: 'private', icon: '🔒', label: 'Private' },
                { id: 'inscribe', icon: '✍️', label: 'Inscribe' },
                { id: 'profile', icon: '👤', label: 'Profile' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative z-10 flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'text-hushr-green'
                      : item.id !== 'threads' && !isConnected
                      ? 'text-white/30'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs font-quicksand">{item.label}</span>
                  {item.id !== 'threads' && !isConnected && (
                    <span className="text-xs">🔒</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TransactionProvider>
          <AppContent />
        </TransactionProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

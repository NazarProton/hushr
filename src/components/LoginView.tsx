import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginViewProps {
  onTabChange: (tab: string) => void;
  message?: string;
}

const LoginView: React.FC<LoginViewProps> = ({ onTabChange, message }) => {
  const { loading, connectWallet } = useAuth();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md border border-hushr-gray">
        <div className="text-center mb-8">
          <div className="w-24 h-12 mx-auto mb-4 flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="Hushr"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2 font-quicksand">
            Welcome to Hushr
          </h1>
          {message && message.includes('disconnected') ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
              <p className="text-red-400 font-quicksand text-sm">{message}</p>
            </div>
          ) : (
            <p className="text-gray-400 font-quicksand">
              {message || 'Connect your wallet to access all features'}
            </p>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <h3 className="text-white font-semibold mb-2 font-quicksand">
              🔒 Secure Authentication
            </h3>
            <p className="text-gray-400 text-sm font-quicksand">
              Your wallet is your identity - no passwords needed
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <h3 className="text-white font-semibold mb-2 font-quicksand">
              💬 Private Messaging
            </h3>
            <p className="text-gray-400 text-sm font-quicksand">
              End-to-end encrypted conversations
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <h3 className="text-white font-semibold mb-2 font-quicksand">
              ✍️ Content Creation
            </h3>
            <p className="text-gray-400 text-sm font-quicksand">
              Create and share your thoughts securely
            </p>
          </div>
        </div>

        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full bg-hushr-green hover:bg-hushr-green/90 disabled:bg-hushr-green/50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 font-quicksand"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </>
          ) : (
            <>
              <span className="text-xl">👛</span>
              Connect Wallet
            </>
          )}
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => onTabChange('threads')}
            className="text-hushr-green hover:text-hushr-green/80 text-sm font-quicksand"
          >
            Browse threads without connecting →
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-quicksand">
            <span className="text-lg">🛡️</span>
            <span>Powered by Web3 technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;

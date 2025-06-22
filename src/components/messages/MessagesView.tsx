import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  mockUsers,
  mockResponses,
  createMockChats,
  MockMessage,
  Chat,
} from '../../lib/mockData';

interface MessagesViewProps {
  onNotificationChange: (hasNotification: boolean) => void;
  selectedChatId?: string;
}

const MessagesView: React.FC<MessagesViewProps> = ({
  onNotificationChange,
  selectedChatId: propSelectedChatId,
}) => {
  const { walletAddress } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(
    propSelectedChatId || 'chat-1'
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
  ];

  const getUserColor = (userId: string) => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % userColors.length;
    return userColors[colorIndex];
  };

  const [chats, setChats] = useState<Chat[]>(
    createMockChats(walletAddress || undefined)
  );

  useEffect(() => {
    if (propSelectedChatId) {
      setSelectedChatId(propSelectedChatId);
    }
  }, [propSelectedChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, selectedChatId]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const generateAutoResponse = () => {
    const availableUsers = mockUsers.filter(
      (user) => user.id !== 'current-user'
    );
    const randomUser =
      availableUsers[Math.floor(Math.random() * availableUsers.length)];
    const randomResponse =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];

    const newResponse: MockMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      content: randomResponse,
      sender_id: randomUser.id,
      created_at: new Date().toISOString(),
      sender: randomUser,
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newResponse],
              lastMessage: randomResponse,
            }
          : chat
      )
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedImage) return;

    const messageId = `msg-${Date.now()}`;
    const userMessage: MockMessage = {
      id: messageId,
      content: newMessage || (selectedImage ? 'Image' : ''),
      sender_id: 'current-user',
      created_at: new Date().toISOString(),
      sender: {
        id: 'current-user',
        wallet_address: walletAddress || '0x5B...42A8',
        display_name: 'You',
      },
      image: selectedImage || undefined,
      ticks: 'one',
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              lastMessage: newMessage,
            }
          : chat
      )
    );

    setNewMessage('');
    setSelectedImage(null);

    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, ticks: 'two' } : msg
                ),
              }
            : chat
        )
      );

      generateAutoResponse();

      if (Math.random() > 0.5) {
        setTimeout(() => {
          generateAutoResponse();
        }, 2000 + Math.random() * 3000);
      }
    }, 1000 + Math.random() * 2000);

    onNotificationChange(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getUniqueMembersCount = (chat: Chat) => {
    const uniqueSenders = new Set();
    chat.messages.forEach((message) => {
      uniqueSenders.add(message.sender_id);
    });
    return uniqueSenders.size;
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const currentMessages = selectedChat ? selectedChat.messages : [];

  return (
    <div className="flex h-screen w-full min-w-[696px] border-l border-r border-hushr-gray lg:border-l lg:border-r border-l-0 border-r-0 relative">
      <div className="flex flex-col w-full">
        <div className="sticky top-0 bg-black border-b border-hushr-gray p-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
              <div className="w-full h-full flex items-center justify-center text-black font-bold">
                {selectedChat?.name.substring(0, 2).toUpperCase() || 'CD'}
              </div>
            </div>
            <div>
              <div className="text-white font-quicksand font-semibold text-base">
                {selectedChat?.name || 'Cases Discussion'}
              </div>
              <div className="text-white/70 font-quicksand text-sm">
                {selectedChat
                  ? `${getUniqueMembersCount(selectedChat)} members`
                  : '3 members'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-8">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_id === 'current-user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {message.sender_id !== 'current-user' && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <div
                    className={`w-full h-full flex items-center justify-center text-white text-xs font-bold ${getUserColor(
                      message.sender_id
                    )}`}
                  >
                    {message.sender?.display_name?.substring(0, 2) || 'U'}
                  </div>
                </div>
              )}

              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender_id === 'current-user'
                    ? 'bg-hushr-green text-black'
                    : 'bg-white/10 text-white'
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Shared image"
                    className="w-full rounded-lg mb-2"
                  />
                )}
                {message.content && (
                  <p className="font-quicksand text-sm">{message.content}</p>
                )}
                <div
                  className={`flex items-center justify-between mt-1 text-xs ${
                    message.sender_id === 'current-user'
                      ? 'text-black/70'
                      : 'text-white/50'
                  }`}
                >
                  <span>{formatTime(message.created_at)}</span>
                  {message.sender_id === 'current-user' && message.ticks && (
                    <div className="flex items-center ml-2">
                      <img
                        src={
                          message.ticks === 'two'
                            ? '/chat/2ticks.svg'
                            : '/chat/1tick.svg'
                        }
                        alt={`${message.ticks} tick${
                          message.ticks === 'two' ? 's' : ''
                        }`}
                        className="w-4 h-4"
                      />
                    </div>
                  )}
                </div>
              </div>

              {message.sender_id === 'current-user' && (
                <div className="w-8 h-8 rounded-full overflow-hidden ml-3 flex-shrink-0">
                  <div className="w-full h-full bg-hushr-green flex items-center justify-center text-black text-xs font-bold">
                    {walletAddress?.substring(0, 2).toUpperCase() || 'YU'}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 bg-black border-t border-hushr-gray p-4">
          {selectedImage && (
            <div className="mb-4 relative inline-block">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm"
              >
                ×
              </button>
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={triggerFileSelect}
              className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:border-hushr-green"
              />
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim() && !selectedImage}
              className="flex-shrink-0 w-10 h-10 bg-hushr-green rounded-full flex items-center justify-center hover:bg-hushr-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;

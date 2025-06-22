import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getAvatarForUser } from '../../lib/avatars';
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
    '#4080F8',
    '#40F8F8',
    '#8040F8',
    '#F84040',
    '#F840B8',
    '#F88040',
    '#F8E040',
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
                  <img
                    src={getAvatarForUser(message.sender?.wallet_address || '')}
                    alt={message.sender?.display_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-md ${
                  message.sender_id === 'current-user' ? 'ml-12' : 'mr-12'
                }`}
              >
                <div className="px-4 py-2 rounded-2xl bg-white/10 text-white">
                  <div
                    className={`mb-1 ${
                      message.sender_id === 'current-user'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    <span
                      className="font-quicksand font-semibold text-sm"
                      style={{
                        color:
                          message.sender_id === 'current-user'
                            ? '#40F8AB'
                            : getUserColor(message.sender_id),
                      }}
                    >
                      {message.sender_id === 'current-user'
                        ? `${(message.sender?.wallet_address || '').slice(
                            0,
                            6
                          )}...${(message.sender?.wallet_address || '').slice(
                            -4
                          )}`
                        : message.sender?.wallet_address}
                    </span>
                  </div>

                  {message.image && (
                    <div
                      className={
                        message.content && message.content !== 'Image'
                          ? 'mb-2'
                          : ''
                      }
                    >
                      <img
                        src={message.image}
                        alt="Shared image"
                        className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                      />
                    </div>
                  )}

                  {message.content && message.content !== 'Image' && (
                    <div className="flex items-end justify-between gap-2">
                      <p className="font-quicksand text-sm flex-1">
                        {message.content}
                      </p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-white/50 font-quicksand text-xs">
                          {formatTime(message.created_at)}
                        </span>
                        {message.sender_id === 'current-user' &&
                          message.ticks && (
                            <img
                              src={
                                message.ticks === 'one'
                                  ? '/chat/1tick.svg'
                                  : '/chat/2ticks.svg'
                              }
                              alt={
                                message.ticks === 'one' ? '1 tick' : '2 ticks'
                              }
                              className="w-4 h-3"
                            />
                          )}
                      </div>
                    </div>
                  )}

                  {message.image &&
                    (!message.content || message.content === 'Image') && (
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-white/50 font-quicksand text-xs">
                          {formatTime(message.created_at)}
                        </span>
                        {message.sender_id === 'current-user' &&
                          message.ticks && (
                            <img
                              src={
                                message.ticks === 'one'
                                  ? '/chat/1tick.svg'
                                  : '/chat/2ticks.svg'
                              }
                              alt={
                                message.ticks === 'one' ? '1 tick' : '2 ticks'
                              }
                              className="w-4 h-3"
                            />
                          )}
                      </div>
                    )}
                </div>
              </div>

              {message.sender_id === 'current-user' && (
                <div className="w-8 h-8 rounded-full overflow-hidden ml-3 flex-shrink-0">
                  <img
                    src={getAvatarForUser(walletAddress || 'current-user')}
                    alt="You"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/avatars/1.webp') {
                        target.src = '/avatars/1.webp';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {selectedImage && (
          <div className="absolute bottom-24 left-4 z-20">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-[100px] max-h-[100px] rounded-lg object-cover shadow-lg"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="sticky bottom-8 flex flex-col items-start px-4 z-10">
          <form onSubmit={handleSendMessage} className="w-full max-w-[664px]">
            <div className="flex items-center justify-between px-4 py-4 gap-4 w-full h-16 bg-black border border-hushr-gray rounded-2xl">
              <div className="flex items-center gap-2 flex-1">
                <button
                  type="button"
                  onClick={triggerFileSelect}
                  className="group w-6 h-6 text-white/50 hover:text-hushr-green transition-colors"
                >
                  <img
                    src="/buttons/attachImage.svg"
                    alt="Attach Image"
                    className="w-full h-full group-hover:opacity-100 opacity-50 transition-opacity"
                  />
                </button>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Speak safely..."
                  className="flex-1 bg-transparent text-white placeholder-white/50 font-quicksand font-medium text-base leading-5 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!newMessage.trim() && !selectedImage}
                className="w-7 h-7 disabled:opacity-30 transition-opacity"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M4.03 15.75L10.5 14L4.03 12.25L4 4L24 14L4 24L4.03 15.75Z"
                    fill="#40F8AB"
                  />
                </svg>
              </button>
            </div>
          </form>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesView;

import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  mockThreads,
  additionalMockThreads,
  MockThread,
} from '../../lib/mockData';
import { getAvatarForUser } from '../../lib/avatars';

const ThreadsView: React.FC = () => {
  const { walletAddress, user, isConnected, connectWallet, loading } =
    useAuth();
  const [newThreadContent, setNewThreadContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [pendingPost, setPendingPost] = useState<{
    content: string;
    images: File[];
    imageUrls: string[];
  } | null>(null);

  const [threads, setThreads] = useState<MockThread[]>(mockThreads);

  React.useEffect(() => {
    if (isConnected && walletAddress && user && pendingPost) {
      createPostWithData(
        pendingPost.content,
        pendingPost.images,
        pendingPost.imageUrls
      );
      setPendingPost(null);
    }
  }, [isConnected, walletAddress, user, pendingPost]);

  const createPostWithData = (
    content: string,
    images: File[],
    imageUrls: string[]
  ) => {
    if (!content.trim()) return;

    let imageUrl = undefined;
    if (images.length > 0 && imageUrls.length > 0) {
      imageUrl = imageUrls[0];
    }

    const displayAddress =
      user?.display_name ||
      `${walletAddress!.slice(0, 6)}...${walletAddress!.slice(-4)}`;
    const userAvatar = getAvatarForUser(walletAddress!);

    const newPost: MockThread = {
      id: `user-${Date.now()}`,
      content: content,
      author: user!.display_name || 'You',
      walletAddress: displayAddress,
      handle: `@${walletAddress!.slice(0, 8)}`,
      avatar: userAvatar,
      timestamp: 'now',
      reactions: { comments: 0, likes: 0, views: 1, shares: 0 },
      hasImage: images.length > 0,
      imageUrl: imageUrl,
    };

    setThreads((prevThreads) => [newPost, ...prevThreads]);

    setNewThreadContent('');
    setSelectedImages([]);
    setImagePreviewUrls([]);

    console.log('✅ Thread created successfully!');
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = files.slice(0, 4 - selectedImages.length);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

    setSelectedImages((prev) => [...prev, ...newFiles]);
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);

    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const createPost = async () => {
    if (!isConnected || !walletAddress || !user) {
      setPendingPost({
        content: newThreadContent,
        images: [...selectedImages],
        imageUrls: [...imagePreviewUrls],
      });
      setIsConnecting(true);
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setPendingPost(null);
      } finally {
        setIsConnecting(false);
      }
      return;
    }

    createPostWithData(newThreadContent, selectedImages, imagePreviewUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost();
  };

  const handleLikeClick = (postId: string) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === postId) {
          const isCurrentlyLiked = likedPosts.has(postId);
          return {
            ...thread,
            reactions: {
              ...thread.reactions,
              likes: isCurrentlyLiked
                ? thread.reactions.likes - 1
                : thread.reactions.likes + 1,
            },
          };
        }
        return thread;
      })
    );
  };

  const hasContent = newThreadContent.trim().length > 0;
  const isProcessing = isConnecting || loading;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const loadMorePosts = async () => {
    setIsLoadingPosts(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const shuffledPosts = shuffleArray(additionalMockThreads);

    setThreads((prevThreads) => [...shuffledPosts, ...prevThreads]);
    setHasLoadedMore(true);
    setIsLoadingPosts(false);
  };

  return (
    <div className="w-full border-l border-r border-hushr-gray lg:border-l lg:border-r border-l-0 border-r-0 hide-scrollbar">
      <div className="bg-black border-b border-hushr-gray">
        <div className="flex flex-col justify-center items-start px-4 lg:px-20 py-6 lg:py-12 gap-4 w-full">
          {isProcessing && (
            <div className="w-full max-w-[536px] mb-3 bg-hushr-green/10 border border-hushr-green/20 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-hushr-green border-t-transparent rounded-full animate-spin"></div>
                <p className="text-hushr-green font-quicksand text-sm">
                  Connecting wallet...
                </p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center gap-4 w-full max-w-[536px] h-[30px] mb-4">
              <div className="flex-1 flex items-center gap-2">
                <textarea
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (hasContent && !isProcessing) createPost();
                    }
                  }}
                  placeholder="Speak safely..."
                  disabled={isProcessing}
                  className="w-full bg-transparent text-white placeholder-white/50 text-xl lg:text-2xl font-quicksand font-medium leading-[30px] resize-none focus:outline-none disabled:opacity-50"
                  rows={1}
                  maxLength={280}
                />
              </div>
              <button
                type="submit"
                disabled={!hasContent || isProcessing}
                className="w-6 h-6 lg:w-7 lg:h-7 flex disabled:opacity-50 items-center
                 justify-center flex-shrink-0 transition-opacity duration-200 disabled:cursor-not-allowed"
              >
                <img
                  src={
                    hasContent && !isProcessing
                      ? '/buttons/createPostAble.svg'
                      : '/buttons/createPostDisable.svg'
                  }
                  alt={hasContent && !isProcessing ? 'Post' : 'Post (disabled)'}
                  className="w-full h-full"
                />
              </button>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2 max-w-[536px]">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={selectedImages.length >= 4 || isProcessing}
                className="w-5 group h-5 lg:w-6 lg:h-6 flex items-center justify-center flex-shrink-0 disabled:opacity-50"
              >
                <img
                  src="/buttons/attachImage.svg"
                  alt="Attach Image"
                  className="w-full h-full group-hover:opacity-100 opacity-50 transition-opacity"
                />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </form>
        </div>
      </div>

      {!hasLoadedMore && (
        <div className="bg-black border-b border-hushr-gray">
          <div className="flex justify-center items-center px-4 py-4 w-full h-[52px]">
            <button
              onClick={loadMorePosts}
              disabled={isLoadingPosts}
              className="flex items-center gap-2 text-hushr-green font-quicksand font-semibold text-base leading-5 hover:text-hushr-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingPosts ? (
                <>
                  <div className="w-4 h-4 border-2 border-hushr-green border-t-transparent rounded-full animate-spin"></div>
                  Loading posts...
                </>
              ) : (
                `Show ${additionalMockThreads.length} more posts`
              )}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="flex items-start px-4 py-6 lg:py-8 gap-4 w-full border-b border-hushr-gray hover:bg-gray-950/10 transition-colors"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={thread.avatar}
                alt={thread.walletAddress}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== '/avatars/1.webp') {
                    target.src = '/avatars/1.webp';
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-3 lg:gap-4 flex-1 min-w-0">
              <div className="flex items-center gap-2 h-5">
                <span className="text-white font-quicksand font-semibold text-sm lg:text-base leading-5 truncate">
                  {thread.walletAddress}
                </span>
                <span className="text-white/50 font-quicksand font-semibold text-sm lg:text-base leading-5 flex-shrink-0">
                  ·
                </span>
                <span className="text-white/50 font-quicksand font-medium text-sm lg:text-base leading-5 flex-shrink-0">
                  {thread.timestamp}
                </span>
              </div>

              <div className="text-white font-quicksand font-medium text-sm lg:text-base leading-5 w-full">
                {thread.content}
              </div>

              {thread.hasImage && thread.imageUrl && (
                <div className="w-full max-w-[600px] aspect-square lg:h-[400px] xl:h-[600px] rounded-2xl overflow-hidden bg-gray-800">
                  <img
                    src={thread.imageUrl}
                    alt="Thread image"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gray-800 text-white/50">
                            <div class="text-center">
                              <div class="text-2xl mb-2">📷</div>
                              <div class="text-sm">Image not available</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'block';
                    }}
                  />
                </div>
              )}

              <div className="flex items-center w-full h-9 gap-2 lg:gap-0">
                <button className="flex group items-center py-2 gap-2 flex-1 lg:w-[150px] h-9">
                  <div className="w-4 h-4 flex-shrink-0">
                    <img
                      src="/buttons/comments.svg"
                      alt="Comments"
                      className="w-4 h-4 group-hover:opacity-100 opacity-50 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span
                    className="text-white/50 group-hover:text-white transition-colors
                   font-quicksand font-medium text-sm lg:text-base leading-5"
                  >
                    {thread.reactions.comments}
                  </span>
                </button>

                <button
                  onClick={() => handleLikeClick(thread.id)}
                  className="flex group items-center py-2 gap-2 flex-1 lg:w-[150px] h-9"
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <img
                      src={
                        likedPosts.has(thread.id)
                          ? '/buttons/likeRed.svg'
                          : '/buttons/like.svg'
                      }
                      alt="Like"
                      className={`w-4 h-4 transition-opacity ${
                        likedPosts.has(thread.id)
                          ? 'opacity-100'
                          : 'group-hover:opacity-100 opacity-50'
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span
                    className={`transition-colors font-quicksand font-medium text-sm lg:text-base leading-5 ${
                      likedPosts.has(thread.id)
                        ? 'text-red-500'
                        : 'text-white/50 group-hover:text-white'
                    }`}
                  >
                    {thread.reactions.likes}
                  </span>
                </button>

                <button className="flex group items-center py-2 gap-2 flex-1 lg:w-[150px] h-9">
                  <div className="w-4 h-4 flex-shrink-0">
                    <img
                      src="/buttons/wievs.svg"
                      alt="Views"
                      className="w-4 h-4 group-hover:opacity-100 opacity-50 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span
                    className="text-white/50 group-hover:text-white transition-colors
                     font-quicksand font-medium text-sm lg:text-base leading-5"
                  >
                    {thread.reactions.views}
                  </span>
                </button>

                <button className="flex group items-center py-2 gap-2 flex-1 lg:w-[150px] h-9">
                  <div className="w-4 h-4 flex-shrink-0">
                    <img
                      src="/buttons/share.svg"
                      alt="Share"
                      className="w-4 h-4 group-hover:opacity-100 opacity-50 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <span
                    className="text-white/50 group-hover:text-white transition-colors
                     font-quicksand font-medium text-sm lg:text-base leading-5"
                  >
                    Share
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="h-96 flex items-center justify-center w-full">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 bg-hushr-gray rounded-full"></div>
            <div className="text-white/50 font-quicksand text-sm">
              Loading more threads...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadsView;

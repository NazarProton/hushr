import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getAvatarForUser } from '../../lib/avatars';

interface ProfileViewProps {
  onTabChange?: (tab: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onTabChange }) => {
  const { user, walletAddress, isConnected, connectWallet, disconnectWallet } =
    useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.display_name || '',
    bio: user?.bio || '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log('Saving profile:', editForm);
    setIsEditing(false);
    alert('Profile updated! (Mock implementation)');
  };

  const handleCancel = () => {
    setEditForm({
      displayName: user?.display_name || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDisconnect = () => {
    disconnectWallet(() => {
      if (onTabChange) {
        onTabChange('threads');
      }
    });
  };

  if (!isConnected || !user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-24 h-24 rounded-full bg-hushr-gray flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div>
            <h2 className="text-white font-quicksand font-semibold text-2xl mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-white/70 font-quicksand mb-6">
              Connect your wallet to view and edit your profile
            </p>
            <button
              onClick={connectWallet}
              className="flex justify-center items-center px-6 py-3 gap-2 border border-hushr-green rounded-2xl hover:bg-hushr-green/10 transition-colors"
            >
              <span className="text-hushr-green font-quicksand font-semibold text-lg">
                Connect Wallet
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-l min-w-[696px] min-h-screen border-r border-hushr-gray lg:border-l lg:border-r border-l-0 border-r-0">
      <div className="flex flex-col px-8 py-8 gap-8 overflow-y-auto h-full">
        {/* Profile Header */}
        <div className="flex flex-col items-start gap-6 border border-white/25 rounded-2xl p-8">
          <div className="flex items-start justify-between w-full">
            <h1 className="text-white font-quicksand font-semibold text-2xl">
              {isEditing ? 'Edit Profile' : 'Profile'}
            </h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-hushr-green rounded-xl hover:bg-hushr-green/10 transition-colors"
              >
                <span className="text-hushr-green font-quicksand font-semibold">
                  Edit
                </span>
              </button>
            )}
          </div>

          <div className="flex items-start gap-6 w-full">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={
                    selectedImage ||
                    getAvatarForUser(walletAddress || 'default')
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button
                  onClick={triggerFileSelect}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-hushr-green rounded-full flex items-center justify-center hover:bg-hushr-green/90 transition-colors"
                >
                  <span className="text-black text-sm">📷</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              {/* Display Name */}
              <div>
                <label className="block text-white/70 font-quicksand text-sm mb-2">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        displayName: e.target.value,
                      }))
                    }
                    className="w-full bg-black border border-white/25 text-white rounded-xl px-4 py-3 font-quicksand focus:outline-none focus:border-hushr-green transition-colors"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <p className="text-white font-quicksand text-lg">
                    {user.display_name || 'Anonymous User'}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white/70 font-quicksand text-sm mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="w-full bg-black border border-white/25 text-white rounded-xl px-4 py-3 font-quicksand focus:outline-none focus:border-hushr-green transition-colors resize-none"
                    rows={3}
                    placeholder="Tell us about yourself"
                  />
                ) : (
                  <p className="text-white font-quicksand">
                    {user.bio || 'No bio yet'}
                  </p>
                )}
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-white/70 font-quicksand text-sm mb-2">
                  Wallet Address
                </label>
                <div className="flex items-center gap-3">
                  <code className="text-hushr-green font-mono text-sm bg-black border border-white/25 px-3 py-2 rounded-xl">
                    {walletAddress}
                  </code>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={getAvatarForUser(walletAddress || 'default')}
                      alt="Wallet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="flex gap-3 w-full">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-hushr-green text-black rounded-xl hover:bg-hushr-green/90 transition-colors font-quicksand font-semibold"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-white rounded-xl hover:bg-white/5 transition-colors font-quicksand"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-6 border border-white/25 rounded-2xl p-8">
          <h2 className="text-white font-quicksand font-semibold text-xl">
            Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black border border-white/25 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <p className="text-white font-quicksand font-medium">
                    Notifications
                  </p>
                  <p className="text-white/70 font-quicksand text-sm">
                    Get notified about new messages and activity
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-hushr-green text-black rounded-xl font-quicksand font-semibold hover:bg-hushr-green/90 transition-colors">
                Enabled
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black border border-white/25 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-white font-quicksand font-medium">
                    Privacy
                  </p>
                  <p className="text-white/70 font-quicksand text-sm">
                    Control who can message you and see your profile
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 border border-white/25 text-white rounded-xl font-quicksand hover:bg-white/5 transition-colors">
                Public
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black border border-white/25 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <p className="text-white font-quicksand font-medium">Theme</p>
                  <p className="text-white/70 font-quicksand text-sm">
                    Customize your app appearance
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 border border-white/25 text-white rounded-xl font-quicksand hover:bg-white/5 transition-colors">
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="flex flex-col gap-4 border border-red-500/25 rounded-2xl p-8">
          <h2 className="text-red-400 font-quicksand font-semibold text-xl">
            Danger Zone
          </h2>
          <p className="text-white/70 font-quicksand text-sm mb-4">
            Once you disconnect your wallet, you will lose access to your
            profile and data.
          </p>
          <button
            onClick={handleDisconnect}
            className="self-start px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-quicksand font-semibold"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

import React, { useState } from 'react';
import { Bell, LogOut, MapPin, Search, Filter } from 'lucide-react';
import { User } from '../../types/auth';

interface FixedHeaderProps {
  user: Partial<User>;
  onLogout: () => void;
  onSearch?: (query: string) => void;
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({
  user,
  onLogout,
  onSearch
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    console.log('Search query:', searchQuery);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-600 to-secondary-600 shadow-strong">
      <div className="pt-4 pb-3 sm:pb-4 px-3 sm:px-4 md:px-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="w-6 sm:w-8 h-6 sm:h-8 glass rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white/80 text-xs">Current Location</p>
              <p className="text-white font-medium text-xs sm:text-sm truncate">Bangalore, Karnataka</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={handleSearchToggle}
              aria-label="Toggle search"
              className="w-6 sm:w-8 h-6 sm:h-8 glass rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
            <button 
              aria-label="View notifications"
              className="w-6 sm:w-8 h-6 sm:h-8 glass rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Bell className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onLogout}
              aria-label="Logout from account"
              className="w-6 sm:w-8 h-6 sm:h-8 glass rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Bar - Toggleable */}
      {showSearch && (
        <div className="px-3 sm:px-4 md:px-6 pb-4 border-t border-white/20">
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              placeholder="Search salons, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-16 py-3 glass border-0 rounded-xl shadow-medium focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200"
              autoFocus
            />
            <button
              onClick={handleSearch}
              aria-label="Search and filter salons"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-6 sm:w-7 h-6 sm:h-7 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
            >
              <Filter className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
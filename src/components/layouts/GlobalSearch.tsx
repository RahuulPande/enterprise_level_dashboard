'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Clock, Star, Hash } from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'section' | 'feature';
  icon: React.ComponentType<any>;
  action: () => void;
  badge?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export default function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { services, openServiceModal } = useDashboardStore();

  const searchResults: SearchResult[] = [
    // Services
    ...services
      .filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.type.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
      .map(service => ({
        id: service.id,
        title: service.name,
        description: `${service.type} service - ${service.status}`,
        category: 'service' as const,
        icon: Hash,
        badge: service.status,
        action: () => {
          openServiceModal(service);
          onClose();
        }
      })),
    
    // Navigation sections
    ...[
      { id: 'overview', title: 'Overview', description: 'Executive summary and key metrics' },
      { id: 'service-health', title: 'Service Health', description: 'Real-time service monitoring' },
      { id: 'incidents-alerts', title: 'Incidents & Alerts', description: 'Alert management' },
      { id: 'ai-intelligence', title: 'AI Intelligence', description: 'AI-powered insights' },
      { id: 'release-management', title: 'Release Management', description: 'Release readiness' },
      { id: 'analytics', title: 'Analytics', description: 'Performance and cost analytics' },
      { id: 'settings', title: 'Settings', description: 'Configuration and admin' }
    ]
      .filter(section => 
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(section => ({
        id: section.id,
        title: section.title,
        description: section.description,
        category: 'section' as const,
        icon: ArrowRight,
        action: () => {
          onNavigate(section.id);
          onClose();
        }
      }))
  ].filter(result => 
    query.length === 0 || 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          searchResults[selectedIndex].action();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service': return Hash;
      case 'section': return ArrowRight;
      default: return Search;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'text-green-600 bg-green-100';
      case 'section': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search services, sections, and features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none text-lg placeholder-gray-400"
              />
              <div className="flex items-center space-x-2 ml-4">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  ↑↓
                </kbd>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  Enter
                </kbd>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  Esc
                </kbd>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((result, index) => {
                    const IconComponent = getCategoryIcon(result.category);
                    const isSelected = index === selectedIndex;
                    
                    return (
                      <motion.button
                        key={result.id}
                        onClick={result.action}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${getCategoryColor(result.category)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                            {result.badge && (
                              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                result.badge === 'healthy' ? 'bg-green-100 text-green-800' :
                                result.badge === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                                result.badge === 'down' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {result.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{result.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    {query ? `No results for "${query}"` : 'Start typing to search...'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Tip: Use keyboard shortcuts to navigate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">K</kbd>
                  <span>to search</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
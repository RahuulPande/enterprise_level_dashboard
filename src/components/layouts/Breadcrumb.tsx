'use client';

import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

export default function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  const handleClick = (href: string | undefined, e: React.MouseEvent) => {
    if (href && onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => handleClick('overview', e)}
        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </motion.button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href && !item.isActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(item.href, e)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {item.label}
            </motion.button>
          ) : (
            <span className={`font-medium ${
              item.isActive ? 'text-blue-600' : 'text-gray-900'
            }`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
} 
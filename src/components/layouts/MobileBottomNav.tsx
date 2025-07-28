'use client';

import { motion } from 'framer-motion';
import { 
  Home,
  Activity,
  AlertTriangle,
  Brain,
  Package,
  BarChart3,
  Settings
} from 'lucide-react';

interface MobileBottomNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'overview', icon: Home, label: 'Overview' },
  { id: 'service-health', icon: Activity, label: 'Health' },
  { id: 'incidents-alerts', icon: AlertTriangle, label: 'Alerts' },
  { id: 'ai-intelligence', icon: Brain, label: 'AI' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' }
];

export default function MobileBottomNav({ currentSection, onSectionChange }: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors relative ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-indicator"
                  className="absolute inset-0 bg-blue-50 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <IconComponent className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Safe area for iPhone bottom indicator */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </div>
  );
} 
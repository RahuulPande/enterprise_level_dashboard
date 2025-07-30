'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileResponsive, useSwipeGestures } from '@/lib/hooks/useMobileResponsive';
import { 
  Home,
  Activity,
  AlertTriangle,
  Brain,
  Package,
  BarChart3,
  Settings,
  Book,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface NavigationSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  description: string;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'overview',
    name: 'Overview',
    icon: Home,
    path: '/overview',
    description: 'Executive summary and key metrics'
  },
  {
    id: 'service-health',
    name: 'Service Health',
    icon: Activity,
    path: '/service-health',
    description: 'Real-time service monitoring'
  },
  {
    id: 'incidents-alerts',
    name: 'Incidents & Alerts',
    icon: AlertTriangle,
    path: '/incidents-alerts',
    description: 'Alert management and incident tracking'
  },
  {
    id: 'ai-intelligence',
    name: 'AI Intelligence',
    icon: Brain,
    path: '/ai-intelligence',
    description: 'AI-powered insights and predictions'
  },
  {
    id: 'release-management',
    name: 'Release Management',
    icon: Package,
    path: '/release-management',
    description: 'Release readiness and testing'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
    description: 'Performance and cost analytics'
  },
  {
    id: 'tech-docs',
    name: 'Technical Docs',
    icon: Book,
    path: '/tech-docs',
    description: 'Implementation guides and FAQs'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    path: '/settings',
    description: 'Configuration and administration'
  }
];

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ 
  currentSection, 
  onSectionChange, 
  isCollapsed = false, 
  onToggleCollapse 
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileState = useMobileResponsive();

  // Touch gesture support for mobile
  const { touchEventHandlers } = useSwipeGestures({
    onSwipeLeft: () => {
      if (mobileState.isMobile && isMobileOpen) {
        setIsMobileOpen(false);
      }
    },
    onSwipeRight: () => {
      if (mobileState.isMobile && !isMobileOpen) {
        setIsMobileOpen(true);
      }
    },
    minSwipeDistance: 50
  });

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile/Tablet Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile/Tablet Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{ 
          width: isCollapsed ? '4rem' : '16rem',
          x: isMobileOpen ? 0 : (isCollapsed ? 0 : 0)
        }}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${mobileState.isMobile ? 'touch-pan-x' : ''}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Health Monitor AI</h1>
                  <p className="text-xs text-gray-500">Banking Operations</p>
                </div>
              </motion.div>
            )}
            
            {/* Collapse Toggle (Desktop and Tablet) */}
            <div className="hidden md:block">
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isCollapsed ? 
                  <ChevronRight className="w-4 h-4 text-gray-500" /> : 
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navigationSections.map((section) => {
              const isActive = currentSection === section.id;
              const IconComponent = section.icon;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 min-w-0"
                      >
                        <div className="font-medium text-sm">{section.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {section.description}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-xs text-gray-400">
                Health Monitor AI v2.1
              </div>
              <div className="text-xs text-gray-400">
                🟢 All systems operational
              </div>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Spacer */}
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'md:ml-16' : 'md:ml-64'
      } ml-0`}>
        {/* This ensures main content doesn't overlap with sidebar */}
      </div>
    </>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import MobileBottomNav from '@/components/layouts/MobileBottomNav';
import GlobalSearch from '@/components/layouts/GlobalSearch';
import KeyboardShortcuts from '@/components/layouts/KeyboardShortcuts';
import ThemeToggle from '@/components/layouts/ThemeToggle';
import Breadcrumb from '@/components/layouts/Breadcrumb';
import OverviewSection from '@/components/sections/OverviewSection';
import ServiceHealthSection from '@/components/sections/ServiceHealthSection';
import IncidentsAlertsSection from '@/components/sections/IncidentsAlertsSection';
import AIIntelligenceSection from '@/components/sections/AIIntelligenceSection';
import ReleaseManagementSection from '@/components/sections/ReleaseManagementSection';
import AnalyticsSection from '@/components/sections/AnalyticsSection';
import SettingsSection from '@/components/sections/SettingsSection';
import DemoControlPanel from '@/components/dashboard/DemoControlPanel';
import GlobalSearchNavigation from '@/components/dashboard/GlobalSearchNavigation';
import { useRealTimeData, useDemoScenario } from '@/lib/hooks/useRealTimeData';
import { demoScenarios, demoKeyboardShortcuts } from '@/lib/mock-data/scenarios';
import useDashboardStore from '@/store/dashboard';

const sectionComponents = {
  'overview': OverviewSection,
  'service-health': ServiceHealthSection,
  'incidents-alerts': IncidentsAlertsSection,
  'ai-intelligence': AIIntelligenceSection,
  'release-management': ReleaseManagementSection,
  'analytics': AnalyticsSection,
  'settings': SettingsSection,
};

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const { 
    isDemoMode,
    currentScenario,
    startDemoScenario,
    stopDemoScenario 
  } = useDashboardStore();

  // Initialize real-time data updates and demo scenarios
  useRealTimeData(true, 1000);
  useDemoScenario();

  // Get the active section component
  const ActiveSectionComponent = sectionComponents[currentSection as keyof typeof sectionComponents] || OverviewSection;
  
  // Navigation handler for Overview section
  const handleNavigateFromOverview = (section: string) => {
    setCurrentSection(section);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Global shortcuts
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      
      if (event.key === '?' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setIsShortcutsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsShortcutsOpen(false);
      }

      // Live Demo shortcut (Ctrl+L)
      if ((event.metaKey || event.ctrlKey) && event.key === 'l') {
        event.preventDefault();
        // Trigger live demo if on overview section
        if (currentSection === 'overview') {
          const overviewElement = document.querySelector('[data-section="overview"]');
          if (overviewElement) {
            const liveDemoButton = overviewElement.querySelector('button[data-demo-trigger]') as HTMLButtonElement;
            if (liveDemoButton && !liveDemoButton.disabled) {
              liveDemoButton.click();
            }
          }
        }
      }

      // Demo shortcuts
      if (event.ctrlKey) {
        const shortcut = `ctrl+${event.key}`;
        const scenarioId = demoKeyboardShortcuts[shortcut as keyof typeof demoKeyboardShortcuts];
        if (scenarioId) {
          event.preventDefault();
          const scenario = demoScenarios.find(s => s.id === scenarioId);
          if (scenario) {
            if (isDemoMode && currentScenario?.id === scenarioId) {
              stopDemoScenario();
            } else {
              startDemoScenario(scenario);
            }
          }
        }
      }

      // Navigation shortcuts (vim-style)
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement;
        // Don't trigger if typing in an input
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        if (event.key === 'g') {
          // Wait for next key
          const handleSecondKey = (e: KeyboardEvent) => {
            e.preventDefault();
            switch (e.key) {
              case 'h': setCurrentSection('overview'); break;
              case 's': setCurrentSection('service-health'); break;
              case 'a': setCurrentSection('incidents-alerts'); break;
              case 'i': setCurrentSection('ai-intelligence'); break;
              case 'r': setCurrentSection('release-management'); break;
              case 'n': setCurrentSection('analytics'); break;
            }
            document.removeEventListener('keydown', handleSecondKey);
          };
          document.addEventListener('keydown', handleSecondKey);
          setTimeout(() => document.removeEventListener('keydown', handleSecondKey), 2000);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDemoMode, currentScenario, startDemoScenario, stopDemoScenario, currentSection]);

  // Get breadcrumb items
  const getBreadcrumbItems = () => {
    const sectionNames = {
      'overview': 'Overview',
      'service-health': 'Service Health',
      'incidents-alerts': 'Incidents & Alerts',
      'ai-intelligence': 'AI Intelligence',
      'release-management': 'Release Management',
      'analytics': 'Analytics',
      'settings': 'Settings'
    };

    return [
      {
        label: sectionNames[currentSection as keyof typeof sectionNames] || 'Unknown',
        isActive: true
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } ml-0 min-h-screen pb-20 md:pb-0`}>
        <div className="pt-4 md:pt-0">
          {/* Top Bar with Breadcrumbs and Controls */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex-1">
              <Breadcrumb 
                items={getBreadcrumbItems()}
                onNavigate={handleSectionChange}
              />
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                title="Search (⌘K)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setIsShortcutsOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                title="Keyboard shortcuts (?)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Section Content */}
          {currentSection === 'overview' ? (
            <OverviewSection onNavigate={handleNavigateFromOverview} />
          ) : (
            <ActiveSectionComponent />
          )}
        </div>
      </main>

      {/* Global Search */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSectionChange}
      />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Demo Control Panel */}
      <DemoControlPanel />

      {/* Global Search Navigation */}
      <GlobalSearchNavigation />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import MobileBottomNav from '@/components/layouts/MobileBottomNav';
import GlobalSearch from '@/components/layouts/GlobalSearch';
import KeyboardShortcuts from '@/components/layouts/KeyboardShortcuts';
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
  }, [isDemoMode, currentScenario, startDemoScenario, stopDemoScenario]);



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onSearchOpen={() => setIsSearchOpen(true)}
        onShortcutsOpen={() => setIsShortcutsOpen(true)}
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
        {/* Section Content - Direct without top bar */}
        {currentSection === 'overview' ? (
          <OverviewSection onNavigate={handleNavigateFromOverview} />
        ) : (
          <ActiveSectionComponent />
        )}
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

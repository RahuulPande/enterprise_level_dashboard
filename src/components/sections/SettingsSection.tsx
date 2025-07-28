'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Server, Users } from 'lucide-react';
import SecurityComplianceDashboard from '@/components/dashboard/SecurityComplianceDashboard';
import EnvironmentDashboard from '@/components/dashboard/EnvironmentDashboard';
import CollaborationHub from '@/components/dashboard/CollaborationHub';
import SettingsConfiguration from '@/components/dashboard/SettingsConfiguration';

type SettingsTab = 'general' | 'security' | 'environments' | 'collaboration';

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const tabs = [
    { id: 'general', label: 'General Settings', icon: SettingsIcon },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'environments', label: 'Environment Management', icon: Server },
    { id: 'collaboration', label: 'Team Collaboration', icon: Users }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configuration, administration, and security</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'general' && <SettingsConfiguration />}

        {activeTab === 'security' && <SecurityComplianceDashboard />}

        {activeTab === 'environments' && <EnvironmentDashboard />}

        {activeTab === 'collaboration' && <CollaborationHub />}
      </motion.div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TestTube } from 'lucide-react';
import ReleaseReadinessDashboard from '@/components/dashboard/ReleaseReadinessDashboard';
import TestManagementDashboard from '@/components/dashboard/TestManagementDashboard';

type ReleaseTab = 'readiness' | 'testing';

export default function ReleaseManagementSection() {
  const [activeTab, setActiveTab] = useState<ReleaseTab>('readiness');

  const tabs = [
    { id: 'readiness', label: 'Release Readiness', icon: Package },
    { id: 'testing', label: 'Test Management', icon: TestTube }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Release Management</h1>
        <p className="text-gray-600 mt-1">Comprehensive release and test management</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReleaseTab)}
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
        {activeTab === 'readiness' && <ReleaseReadinessDashboard />}
        {activeTab === 'testing' && <TestManagementDashboard />}
      </motion.div>
    </div>
  );
} 
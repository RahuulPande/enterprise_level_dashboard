'use client';

import { useState } from 'react';
import AIDefectMatcher from '@/components/dashboard/AIDefectMatcher';
import PredictiveAnalytics from '@/components/dashboard/PredictiveAnalytics';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import DefectAnalytics from '@/components/dashboard/DefectAnalytics';

export default function AIIntelligenceSection() {
  const [activeTab, setActiveTab] = useState('insights');

  const tabs = [
    { id: 'insights', label: 'AI Insights', component: AIInsightsPanel },
    { id: 'defects', label: 'Defect Matching', component: AIDefectMatcher },
    { id: 'predictions', label: 'Predictions', component: PredictiveAnalytics },
    { id: 'analytics', label: 'Defect Analytics', component: DefectAnalytics },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AIInsightsPanel;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Intelligence</h1>
        <p className="text-gray-600 mt-1">AI-powered insights and predictions</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <ActiveComponent />
    </div>
  );
} 
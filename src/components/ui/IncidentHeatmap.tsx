'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeatmapData {
  date: string;
  incidents: number;
  level: 'low' | 'medium' | 'high';
}

export const IncidentHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  useEffect(() => {
    // Generate realistic heatmap data for the last 30 days
    const generateData = () => {
      const data: HeatmapData[] = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate realistic incident counts (more on weekdays, fewer on weekends)
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        let baseIncidents = isWeekend ? Math.random() * 3 : Math.random() * 8 + 2;
        
        // Add some variation
        baseIncidents += Math.random() * 5;
        
        const incidents = Math.floor(baseIncidents);
        
        let level: 'low' | 'medium' | 'high';
        if (incidents <= 3) level = 'low';
        else if (incidents <= 6) level = 'medium';
        else level = 'high';
        
        data.push({
          date: date.toISOString().split('T')[0],
          incidents,
          level
        });
      }
      
      setHeatmapData(data);
    };

    generateData();
  }, []);

  const getColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-200 hover:bg-green-300';
      case 'medium': return 'bg-yellow-200 hover:bg-yellow-300';
      case 'high': return 'bg-red-200 hover:bg-red-300';
      default: return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  const getTooltipText = (data: HeatmapData) => {
    return `${data.incidents} incidents prevented on ${new Date(data.date).toLocaleDateString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Prevention Heatmap</h3>
      <p className="text-sm text-gray-600 mb-6">Prevented incidents over the last 30 days</p>
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs text-gray-500 text-center py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {heatmapData.map((data, index) => (
          <motion.div
            key={data.date}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01, duration: 0.3 }}
            className={`relative group cursor-pointer transition-all duration-200 ${getColor(data.level)} rounded-sm`}
            style={{ aspectRatio: '1' }}
            title={getTooltipText(data)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">
                {data.incidents}
              </span>
            </div>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 bg-black/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <span>Low (0-3)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-200 rounded-sm"></div>
          <span>Medium (4-6)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-200 rounded-sm"></div>
          <span>High (7+)</span>
        </div>
      </div>
    </motion.div>
  );
}; 
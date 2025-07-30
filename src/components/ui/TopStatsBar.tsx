'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, DollarSign, Globe } from 'lucide-react';

interface StatData {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export default function TopStatsBar() {
  const [stats, setStats] = useState<StatData[]>([
    { icon: Activity, value: 150, suffix: '+', label: 'Services', color: 'text-blue-500' },
    { icon: Shield, value: 50, suffix: '+', label: 'Incidents Prevented Daily', color: 'text-green-500' },
    { icon: DollarSign, value: 45, suffix: 'K', label: 'Daily Savings', color: 'text-purple-500' },
    { icon: Globe, value: 4500, suffix: '+', label: 'Banks Can Benefit', color: 'text-orange-500' }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === 'Incidents Prevented Daily') {
          return { ...stat, value: Math.floor(Math.random() * 10) + 45 }; // 45-55
        }
        if (stat.label === 'Daily Savings') {
          return { ...stat, value: Math.floor(Math.random() * 5) + 43 }; // 43-48K
        }
        return stat;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-2 px-4 shadow-sm relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center space-x-8 text-sm">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center space-x-2 group cursor-default"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
              <span className="font-bold text-white">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="text-white/90">{stat.label}</span>
              {index < stats.length - 1 && (
                <div className="w-px h-4 bg-white/20 ml-4"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle animated dots */}
      <div className="absolute top-1/2 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </motion.div>
  );
}
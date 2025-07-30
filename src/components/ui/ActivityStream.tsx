'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Brain, Zap, Shield, Activity, TrendingUp, Database, Cpu } from 'lucide-react';

interface ActivityItem {
  id: number;
  icon: any;
  text: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  priority: 'high' | 'medium' | 'low';
}

export const ActivityStream = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      icon: CheckCircle,
      text: "AI prevented potential database overload",
      time: "2 min ago",
      type: 'success',
      priority: 'high'
    },
    {
      id: 2,
      icon: Zap,
      text: "Payment gateway automatically recovered",
      time: "5 min ago",
      type: 'success',
      priority: 'medium'
    },
    {
      id: 3,
      icon: Brain,
      text: "Anomaly detected in API response times",
      time: "8 min ago",
      type: 'warning',
      priority: 'high'
    },
    {
      id: 4,
      icon: Shield,
      text: "Security scan completed successfully",
      time: "12 min ago",
      type: 'info',
      priority: 'low'
    }
  ]);

  const activityMessages = [
    { icon: CheckCircle, text: "Service health check completed", type: 'success' as const, priority: 'low' as const },
    { icon: Brain, text: "AI model updated with new patterns", type: 'info' as const, priority: 'medium' as const },
    { icon: Zap, text: "Auto-scaling triggered for load balancer", type: 'success' as const, priority: 'high' as const },
    { icon: AlertTriangle, text: "Threshold breach detected and resolved", type: 'warning' as const, priority: 'high' as const },
    { icon: Shield, text: "Security vulnerability scan completed", type: 'info' as const, priority: 'low' as const },
    { icon: TrendingUp, text: "Performance optimization applied", type: 'success' as const, priority: 'medium' as const },
    { icon: Database, text: "Database connection pool optimized", type: 'info' as const, priority: 'medium' as const },
    { icon: Cpu, text: "CPU usage normalized after peak", type: 'success' as const, priority: 'low' as const },
    { icon: Activity, text: "Real-time monitoring threshold adjusted", type: 'info' as const, priority: 'low' as const }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = activityMessages[Math.floor(Math.random() * activityMessages.length)];
      const newActivity: ActivityItem = {
        id: Date.now(),
        icon: randomMessage.icon,
        text: randomMessage.text,
        time: "Just now",
        type: randomMessage.type,
        priority: randomMessage.priority
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Activity Stream</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`border-l-4 pl-4 py-2 ${getPriorityColor(activity.priority)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${getTypeColor(activity.type)}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium leading-tight">
                    {activity.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}; 
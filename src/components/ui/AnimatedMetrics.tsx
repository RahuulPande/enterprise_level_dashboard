'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

// Animated Circular Progress Component
export const AnimatedCircularProgress = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  color = '#10B981',
  label = '',
  duration = 2000 
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  duration?: number;
}) => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 }
      });

      let startTime: number;
      const startProgress = 0;
      
      const updateProgress = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentProgress = startProgress + (percentage - startProgress) * easeOutQuart;
        
        setProgress(currentProgress);
        
        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          setProgress(percentage);
        }
      };
      
      requestAnimationFrame(updateProgress);
    }
  }, [inView, percentage, duration, controls]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      className="relative flex flex-col items-center"
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-gray-900">
            {progress.toFixed(1)}%
          </div>
          {label && (
            <div className="text-sm text-gray-600 mt-1">{label}</div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Animated Counter with Glow Effect
export const GlowingAnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  glowColor = '#10B981',
  className = '' 
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  glowColor?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });

      let startTime: number;
      const startCount = 0;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = startCount + (end - startCount) * easeOutQuart;
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [inView, end, duration, controls]);

  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0 rgba(${glowColor}, 0)`,
            `0 0 20px rgba(${glowColor}, 0.3)`,
            `0 0 0 rgba(${glowColor}, 0)`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm"
      >
        <span className="text-3xl font-bold text-gray-900">
          {prefix}{formatNumber(count)}{suffix}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Sparkline with Animation
export const AnimatedSparkline = ({ 
  data, 
  color = '#10B981', 
  height = 60,
  width = 120,
  showTrend = true 
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  showTrend?: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8 }
      });
    }
  }, [inView, controls]);

  const chartData = data.map((value, index) => ({
    index,
    value
  }));

  const trend = data[data.length - 1] > data[0] ? 'up' : 'down';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      className="relative"
    >
      <ResponsiveContainer width={width} height={height}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {showTrend && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-1 -right-1"
        >
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// Live Indicator Component
export const LiveIndicator = ({ isActive = true }: { isActive?: boolean }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? [1, 1.2, 1] : 1,
        opacity: isActive ? [0.7, 1, 0.7] : 0.5
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
    />
  );
};

// Pulsing Metric Card
export const PulsingMetricCard = ({ 
  children, 
  delay = 0,
  className = '' 
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.6 }
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      className={`relative p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 rgba(255, 255, 255, 0)",
            "0 0 30px rgba(255, 255, 255, 0.2)",
            "0 0 0 rgba(255, 255, 255, 0)"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

// Monthly Savings Trend Chart
export const MonthlySavingsChart = ({ data }: { data: any[] }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className="rounded-xl p-6 border border-white/20 shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 drop-shadow-md">Monthly Savings Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: any) => [`$${(value / 1000000).toFixed(1)}M`, 'Savings']}
            labelStyle={{ color: '#374151' }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke="#10B981"
            strokeWidth={3}
            fill="url(#savingsGradient)"
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// System Health Gauge
export const SystemHealthGauge = ({ score }: { score: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8 }
      });
    }
  }, [inView, controls]);

  const getColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const radius = 80;
  const strokeWidth = 12;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <svg width={200} height={200} className="transform -rotate-90">
          <circle
            cx={100}
            cy={100}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={100}
            cy={100}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-900">{score}</div>
          <div className="text-sm text-gray-600">Health Score</div>
        </div>
      </div>
    </motion.div>
  );
}; 
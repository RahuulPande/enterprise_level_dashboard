'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  TrendingUp,
  Shield,
  Zap,
  Brain,
  AlertTriangle,
  Settings,
  ArrowRight,
  DollarSign,
  Clock,
  CheckCircle,
  Activity,
  BarChart3,
  Sparkles,
  Target,
  Users,
  Globe,
  Cpu,
  Database,
  GitBranch,
  Bell,
  PlayCircle,
  Pause,
  ChevronRight,
  Star,
  Award,
  Gauge,
  Timer,
  TrendingDown,
  Eye,
  FileText,
  MousePointer
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import useDashboardStore from '@/store/dashboard';

// Animated Counter Component
const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = '' 
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
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
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
};

// Mini Sparkline Component
const MiniSparkline = ({ data, color = '#10B981', height = 40 }: {
  data: number[];
  color?: string;
  height?: number;
}) => {
  const sparklineData = data.map((value, index) => ({ index, value }));
  
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sparklineData}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  onClick,
  delay = 0 
}: {
  icon: any;
  title: string;
  description: string;
  link: string;
  onClick: () => void;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Success Story Component
const SuccessStory = ({ story, isActive }: { story: string; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : 100
      }}
      transition={{ duration: 0.6 }}
      className={`absolute inset-0 flex items-center justify-center ${isActive ? 'block' : 'hidden'}`}
    >
      <div className="text-center">
        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
        <p className="text-lg font-semibold text-gray-800 px-8">
          {story}
        </p>
      </div>
    </motion.div>
  );
};

// Live Activity Item Component
const ActivityItem = ({ 
  icon: Icon, 
  text, 
  time, 
  type = 'success' 
}: {
  icon: any;
  text: string;
  time: string;
  type?: 'success' | 'warning' | 'info';
}) => {
  const typeColors = {
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50"
    >
      <div className={`p-1 rounded-full ${typeColors[type]}`}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-800 font-medium">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </motion.div>
  );
};

interface OverviewSectionProps {
  onNavigate?: (section: string) => void;
}

export default function OverviewSection(props: OverviewSectionProps = {}) {
  const { onNavigate } = props;
  const { services } = useDashboardStore();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // ROI and metrics data
  const roiData = {
    zurichTeam: { count: 30, dailyCost: 800 },
    puneTeam: { count: 70, dailyCost: 300 },
    get totalDailyCost() {
      return (this.zurichTeam.count * this.zurichTeam.dailyCost) + 
             (this.puneTeam.count * this.puneTeam.dailyCost);
    },
    get annualCost() {
      return this.totalDailyCost * 365;
    },
    get incidentReductionSaving() {
      return this.totalDailyCost * 0.25; // 25% reduction
    },
    get monitoringReductionSaving() {
      return this.totalDailyCost * 0.40; // 40% reduction
    },
    get downtimeReductionSaving() {
      return 500000; // $500k/month
    },
    get totalAnnualSavings() {
      return (this.incidentReductionSaving + this.monitoringReductionSaving) * 365 + 
             (this.downtimeReductionSaving * 12);
    }
  };

  // Success stories
  const successStories = [
    "Prevented major payment system outage - Saved $2.5M",
    "Reduced release deployment time by 60%",
    "Achieved 99.99% uptime for critical services", 
    "Cut incident resolution time from 6 hours to 45 minutes"
  ];

  // Charts data
  const timeSavingsData = [
    { month: 'Jan', hours: 1200 },
    { month: 'Feb', hours: 1850 },
    { month: 'Mar', hours: 2400 },
    { month: 'Apr', hours: 3200 },
    { month: 'May', hours: 4100 },
    { month: 'Jun', hours: 4800 }
  ];

  const costReductionData = [
    { month: 'Jan', savings: 650000 },
    { month: 'Feb', savings: 720000 },
    { month: 'Mar', savings: 810000 },
    { month: 'Apr', savings: 890000 },
    { month: 'May', savings: 920000 },
    { month: 'Jun', savings: 980000 }
  ];

  const teamEfficiencyData = [
    { name: 'Before', incidents: 45, mttr: 6, satisfaction: 65 },
    { name: 'After', incidents: 12, mttr: 1.5, satisfaction: 92 }
  ];

  // Live metrics
  const liveMetrics = useMemo(() => {
    const healthyServices = services.filter(s => s.status === 'healthy').length;
    const totalServices = services.length;
    const uptime = ((healthyServices / totalServices) * 100).toFixed(2);
    
    return {
      currentSavings: roiData.totalAnnualSavings / 1000000, // Convert to millions
      uptime: parseFloat(uptime),
      issuesPrevented: 1847,
      timeSaved: 4800
    };
  }, [services, roiData.totalAnnualSavings]);

  // Live activity feed
  const [activities, setActivities] = useState([
    { id: 1, icon: CheckCircle, text: "AI prevented potential database overload", time: "2 min ago", type: 'success' as const },
    { id: 2, icon: Zap, text: "Payment gateway automatically recovered", time: "5 min ago", type: 'success' as const },
    { id: 3, icon: Brain, text: "Anomaly detected in API response times", time: "8 min ago", type: 'warning' as const },
    { id: 4, icon: Shield, text: "Security scan completed successfully", time: "12 min ago", type: 'info' as const }
  ]);

  // Success story carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, successStories.length]);

  // Live activity updates
  useEffect(() => {
    const activityMessages = [
      { icon: CheckCircle, text: "Service health check completed", type: 'success' as const },
      { icon: Brain, text: "AI model updated with new patterns", type: 'info' as const },
      { icon: Zap, text: "Auto-scaling triggered for load balancer", type: 'success' as const },
      { icon: AlertTriangle, text: "Threshold breach detected and resolved", type: 'warning' as const },
      { icon: Shield, text: "Security vulnerability scan completed", type: 'info' as const }
    ];

    const interval = setInterval(() => {
      const randomMessage = activityMessages[Math.floor(Math.random() * activityMessages.length)];
      const newActivity = {
        id: Date.now(),
        icon: randomMessage.icon,
        text: randomMessage.text,
        time: "Just now",
        type: randomMessage.type
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      // For demo purposes - in production this would navigate to the section
      console.log(`Navigate to section: ${section}`);
      alert(`This would navigate to the ${section} section. Navigation will be implemented when integrated with the main app.`);
    }
  };

  const features = [
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Monitor 150+ services with Splunk-powered insights. Detect issues before they impact users.",
      link: "service-health",
      onClick: () => handleFeatureClick('service-health')
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence", 
      description: "Predict failures 24 hours in advance. Match defects with historical solutions instantly.",
      link: "ai-intelligence",
      onClick: () => handleFeatureClick('ai-intelligence')
    },
    {
      icon: AlertTriangle,
      title: "Automated Incident Management",
      description: "Reduce MTTR by 70%. Smart routing and automated escalations.",
      link: "incidents-alerts", 
      onClick: () => handleFeatureClick('incidents-alerts')
    },
    {
      icon: GitBranch,
      title: "Release Confidence",
      description: "Make data-driven go/no-go decisions. Track testing progress in real-time.",
      link: "release-management",
      onClick: () => handleFeatureClick('release-management')
    },
    {
      icon: BarChart3,
      title: "Cost Optimization",
      description: "Identify savings opportunities. Track infrastructure costs and optimize usage.",
      link: "analytics",
      onClick: () => handleFeatureClick('analytics')
    },
    {
      icon: Settings,
      title: "Enterprise Integration",
      description: "Seamlessly connects with Splunk, JIRA, ServiceNow, and more.",
      link: "settings",
      onClick: () => handleFeatureClick('settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 px-6 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              AI-Powered IT Health Monitor
              <br />
              <span className="text-3xl md:text-5xl">for Enterprise Banking</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto">
              Transforming IT Operations with Predictive Intelligence
            </p>
          </motion.div>

          {/* Live Metrics Row */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-gray-600">Current Savings</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                <AnimatedCounter 
                  end={liveMetrics.currentSavings} 
                  prefix="$" 
                  suffix="M" 
                  decimals={1}
                  duration={3000}
                />
              </div>
              <MiniSparkline data={[12.2, 13.5, 14.8, 15.4, 16.1, 16.7]} color="#059669" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Gauge className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-gray-600">Uptime</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600">
                <AnimatedCounter 
                  end={liveMetrics.uptime} 
                  suffix="%" 
                  decimals={2}
                  duration={2500}
                />
              </div>
              <MiniSparkline data={[99.1, 99.3, 99.5, 99.7, 99.8, 99.9]} color="#2563EB" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-purple-600 mr-2" />
                <span className="text-sm font-semibold text-gray-600">Issues Prevented</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600">
                <AnimatedCounter 
                  end={liveMetrics.issuesPrevented} 
                  duration={2000}
                />
              </div>
              <MiniSparkline data={[1200, 1350, 1480, 1620, 1750, 1847]} color="#7C3AED" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-orange-600 mr-2" />
                <span className="text-sm font-semibold text-gray-600">Time Saved</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600">
                <AnimatedCounter 
                  end={liveMetrics.timeSaved} 
                  suffix=" hrs" 
                  duration={2200}
                />
              </div>
              <MiniSparkline data={[2800, 3200, 3600, 4000, 4400, 4800]} color="#EA580C" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ROI Calculator Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven ROI for Your Banking Operations
            </h2>
            <p className="text-xl text-gray-600">
              Real savings calculations for a 100-person IT team
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Cost Breakdown */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Operational Costs</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Zurich Team (30 people)</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      <AnimatedCounter end={24000} prefix="$" suffix="/day" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">Pune Team (70 people)</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      <AnimatedCounter end={21000} prefix="$" suffix="/day" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Total Daily Cost</span>
                    <span className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={45000} prefix="$" suffix="/day" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Annual ROI Impact</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    <AnimatedCounter 
                      end={roiData.totalAnnualSavings / 1000000} 
                      prefix="$" 
                      suffix="M" 
                      decimals={1}
                      duration={4000}
                    />
                  </div>
                  <p className="text-green-100 text-lg">Total Annual Savings</p>
                  <div className="mt-4 text-sm bg-white/20 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span>Payback Period:</span>
                      <span className="font-bold">17 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5-Year NPV:</span>
                      <span className="font-bold">$51.2M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Efficiency Gains</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Incident Resolution Time</div>
                      <div className="text-sm text-gray-600">25% reduction</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-600">
                        <AnimatedCounter end={11250} prefix="$" suffix="/day" />
                      </div>
                      <div className="text-sm text-gray-500">saved</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Manual Monitoring</div>
                      <div className="text-sm text-gray-600">40% reduction</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-600">
                        <AnimatedCounter end={18000} prefix="$" suffix="/day" />
                      </div>
                      <div className="text-sm text-gray-500">saved</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Downtime Prevention</div>
                      <div className="text-sm text-gray-600">15% reduction</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">
                        <AnimatedCounter end={500} prefix="$" suffix="K/month" />
                      </div>
                      <div className="text-sm text-gray-500">saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature Showcase Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive IT Operations Platform
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to monitor, predict, and optimize your banking infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
                onClick={feature.onClick}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Metrics Dashboard */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Measurable Impact Across All Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Real performance improvements in your critical KPIs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Time Savings Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Time Savings Trend</h3>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSavingsData}>
                    <defs>
                      <linearGradient id="timeSavingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hours`, 'Time Saved']} />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      fill="url(#timeSavingsGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Monthly hours saved through automation and predictive monitoring
              </p>
            </div>

            {/* Cost Reduction Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Monthly Savings</h3>
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costReductionData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Savings']} />
                    <Bar 
                      dataKey="savings" 
                      fill="url(#costGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Cumulative monthly savings from operational improvements
              </p>
            </div>

            {/* Incident Prevention */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">AI Incident Prevention</h3>
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <AnimatedCounter end={1847} />
                </div>
                <p className="text-lg text-gray-700 mb-4">Incidents Prevented</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="font-bold text-purple-600">
                      <AnimatedCounter end={180} />
                    </div>
                    <div className="text-gray-600">This Month</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="font-bold text-purple-600">97.2%</div>
                    <div className="text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Efficiency */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Team Efficiency</h3>
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Incidents/Month</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 line-through">45</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600 font-bold">12</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MTTR (hours)</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 line-through">6.0</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600 font-bold">1.5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Team Satisfaction</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 line-through">65%</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600 font-bold">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Stories Carousel */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from banking operations teams worldwide
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-lg relative h-32">
            {successStories.map((story, index) => (
              <SuccessStory 
                key={index}
                story={story}
                isActive={index === currentStoryIndex}
              />
            ))}
            
            {/* Carousel Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              </button>
              
              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStoryIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions & Live Activity */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureClick('service-health')}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <AlertTriangle className="w-8 h-8" />
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">View Current Issues</h3>
                  <p className="text-red-100 text-sm">Check service health and active problems</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureClick('release-management')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <GitBranch className="w-8 h-8" />
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Check Release Status</h3>
                  <p className="text-blue-100 text-sm">Monitor deployment progress and readiness</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureClick('ai-intelligence')}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Brain className="w-8 h-8" />
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">View AI Insights</h3>
                  <p className="text-purple-100 text-sm">Access predictive analytics and recommendations</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureClick('analytics')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FileText className="w-8 h-8" />
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Generate Executive Report</h3>
                  <p className="text-green-100 text-sm">Create comprehensive analytics reports</p>
                </motion.button>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Live Activity</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">System Active</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {activities.map((activity) => (
                  <ActivityItem 
                    key={activity.id}
                    icon={activity.icon}
                    text={activity.text}
                    time={activity.time}
                    type={activity.type}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 
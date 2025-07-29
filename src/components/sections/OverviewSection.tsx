'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Users,
  Globe,
  Cpu,
  Database,
  GitBranch,
  Bell,
  PlayCircle,
  Pause,
  ChevronRight,
  ChevronLeft,
  Star,
  Award,
  Gauge,
  Timer,
  TrendingDown,
  Eye,
  FileText,
  Info,
  Download,
  X,
  Heart
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import useDashboardStore from '@/store/dashboard';
import { formatNumber } from '@/lib/utils/formatters';

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
  const controls = useRef<number | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    let startTime: number;
    const startCount = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startCount + (end - startCount) * easeOutQuart;
      
      setCount(currentCount);
      
      if (progress < 1) {
        controls.current = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    controls.current = requestAnimationFrame(updateCount);
    
    return () => {
      if (controls.current) {
        cancelAnimationFrame(controls.current);
      }
    };
  }, [end, duration]);

  const formatNumberDisplay = (num: number) => {
    if (decimals === 0) {
      return Math.floor(num).toLocaleString();
    }
    return formatNumber(num, decimals);
  };

  return (
    <span className={className}>
      {prefix}{formatNumberDisplay(count)}{suffix}
    </span>
  );
};

// Live Pulse Indicator
const LivePulse = () => (
  <div className="flex items-center">
    <div className="relative">
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
    </div>
    <span className="ml-2 text-sm text-green-600 font-medium">Live</span>
  </div>
);

// Success Story Card
const SuccessStoryCard = ({ 
  icon: Icon, 
  metric, 
  description, 
  isActive,
  index 
}: {
  icon: any;
  metric: string;
  description: string;
  isActive: boolean;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ 
      opacity: isActive ? 1 : 0.7,
      x: isActive ? 0 : 20,
      scale: isActive ? 1 : 0.95
    }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`p-6 rounded-xl border transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg' 
        : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-start space-x-4">
      <div className={`p-3 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{metric}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  </motion.div>
);

// Savings Calculation Modal
const SavingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Savings Calculation Methodology</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Your Team Costs:</h3>
                <div className="space-y-2 text-sm">
                  <div>• 30 Zurich staff × $800/day = $24,000/day</div>
                  <div>• 70 Pune staff × $300/day = $21,000/day</div>
                  <div className="font-semibold">• Total daily cost: $45,000</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Efficiency Gains (Conservative Estimates):</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-medium text-gray-900">1. Incident Resolution: 25% time saved</div>
                    <div className="text-sm text-gray-600 mt-1">
                      • Before: 6 hours average × 20 incidents/day × $500/hour = $60,000/day lost<br/>
                      • After: 2 hours average × 20 incidents/day × $500/hour = $20,000/day lost<br/>
                      • <span className="font-medium text-green-600">Daily savings: $40,000</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium text-gray-900">2. Manual Monitoring: 40% effort reduced</div>
                    <div className="text-sm text-gray-600 mt-1">
                      • 100 people × 2 hours/day monitoring = 200 hours<br/>
                      • 40% reduction = 80 hours saved × $62.5/hour = $5,000/day
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="font-medium text-gray-900">3. Downtime Prevention: 90% reduction</div>
                    <div className="text-sm text-gray-600 mt-1">
                      • Average downtime cost: $5,600/minute<br/>
                      • Monthly downtime reduced from 180 to 18 minutes<br/>
                      • Monthly savings: $907,200
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="text-xl font-bold text-gray-900 mb-2">Total Annual Savings: $16.7M</div>
                <div className="text-sm text-gray-600">*Based on industry benchmarks and conservative estimates</div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Download Detailed Report
                </button>
                <button className="flex-1 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Customize for Your Team
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

interface OverviewSectionProps {
  onNavigate?: (section: string) => void;
}

export default function OverviewSection(props: OverviewSectionProps = {}) {
  const { onNavigate } = props;
  const { services } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'why-it-works' | 'roi-calculator' | 'success-stories'>('why-it-works');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [isStoryPlaying, setIsStoryPlaying] = useState(true);
  const [activitySidebarOpen, setActivitySidebarOpen] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  // Live Demo Tour - showcases different sections of the dashboard
  const handleLiveDemo = async () => {
    if (!onNavigate || isDemoRunning) return;
    
    setIsDemoRunning(true);
    
    // Demo tour sequence
    const demoSequence = [
      { section: 'service-health', delay: 1000, message: 'Real-time Service Health Monitoring' },
      { section: 'incidents-alerts', delay: 3000, message: 'AI-Powered Incident Detection' },
      { section: 'ai-intelligence', delay: 3000, message: 'Predictive Analytics in Action' },
      { section: 'performance', delay: 3000, message: 'Performance Monitoring Dashboard' },
      { section: 'overview', delay: 2000, message: 'Demo Complete!' }
    ];

    // Show demo notification
    const showDemoMessage = (message: string) => {
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <span>${message}</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2500);
    };

    try {
      for (const step of demoSequence) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        showDemoMessage(step.message);
        onNavigate(step.section);
      }
    } catch (error) {
      console.error('Demo tour error:', error);
    } finally {
      setIsDemoRunning(false);
    }
  };

  // Calculate system health
  const systemHealth = useMemo(() => {
    const healthyServices = services.filter(s => s.status === 'healthy').length;
    const totalServices = services.length;
    return totalServices > 0 ? formatNumber(((healthyServices / totalServices) * 100), 1) : '97.2';
  }, [services]);

  // Success stories data
  const successStories = [
    {
      icon: Shield,
      metric: "99.99% Uptime",
      description: "Critical payment systems maintained perfect availability"
    },
    {
      icon: Timer,
      metric: "2.5M Saved",
      description: "Prevented major outage through early AI detection"
    },
    {
      icon: TrendingUp,
      metric: "60% Faster",
      description: "Deployment time reduced from 4 hours to 90 minutes"
    },
    {
      icon: CheckCircle,
      metric: "70% Reduction",
      description: "MTTR decreased from 6 hours to 45 minutes"
    }
  ];

  // Live activities
  const [activities] = useState([
    { id: 1, icon: CheckCircle, text: "AI prevented database overload", time: "2 min ago", type: 'success' as const },
    { id: 2, icon: Zap, text: "Payment gateway auto-recovered", time: "5 min ago", type: 'success' as const },
    { id: 3, icon: Brain, text: "Anomaly detected in API response", time: "8 min ago", type: 'warning' as const },
    { id: 4, icon: Shield, text: "Security scan completed", time: "12 min ago", type: 'info' as const },
    { id: 5, icon: Activity, text: "Performance baseline updated", time: "15 min ago", type: 'info' as const }
  ]);

  // Success story carousel
  useEffect(() => {
    if (!isStoryPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isStoryPlaying, successStories.length]);

  const handleFeatureClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const quickActions = [
    {
      icon: Activity,
      title: "Monitor Services",
      description: "Real-time health of 150+ services",
      onClick: () => handleFeatureClick('service-health')
    },
    {
      icon: Brain,
      title: "AI Intelligence",
      description: "Predictive insights and recommendations",
      onClick: () => handleFeatureClick('ai-intelligence')
    },
    {
      icon: AlertTriangle,
      title: "View Incidents",
      description: "Active alerts and incident management",
      onClick: () => handleFeatureClick('incidents-alerts')
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Performance metrics and reports",
      onClick: () => handleFeatureClick('analytics')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-16 px-6 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              AI-Powered IT Health Monitor
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Serving 150+ services, preventing 50+ incidents daily
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
          >
            {/* Annual Savings */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter end={16.7} decimals={1} prefix="$" suffix="M" />
              </div>
              <div className="text-gray-600 mb-3">Annual Savings</div>
              <button
                onClick={() => setShowSavingsModal(true)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center"
              >
                How we calculate this
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* System Health */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter end={parseFloat(systemHealth)} decimals={1} suffix="%" />
              </div>
              <div className="text-gray-600 mb-3">System Health</div>
              <LivePulse />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Tabs */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1 mb-8">
          {[
            { id: 'why-it-works', label: 'Why It Works' },
            { id: 'roi-calculator', label: 'ROI Calculator' },
            { id: 'success-stories', label: 'Success Stories' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'why-it-works' && (
            <motion.div
              key="why-it-works"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Before/With AI/Results */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Before</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 6 hours average incident resolution</li>
                    <li>• 40% manual monitoring effort</li>
                    <li>• $500K monthly downtime costs</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">With AI</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• AI predicts failures 24h early</li>
                    <li>• Auto-matches solutions instantly</li>
                    <li>• Smart routing and escalation</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Results</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 2 hour resolution time</li>
                    <li>• 100% automated monitoring</li>
                    <li>• 90% downtime reduction</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Experience our AI-powered dashboard features in action
                  </p>
                  <p className="text-xs text-gray-500">
                    ✨ Guided tour through Service Health, AI Intelligence, Performance Monitoring
                  </p>
                </div>
                <button 
                  onClick={handleLiveDemo}
                  disabled={isDemoRunning}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isDemoRunning 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
                >
                  {isDemoRunning ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Running Demo...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PlayCircle className="w-5 h-5" />
                      <span>See Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          )}

           {activeTab === 'roi-calculator' && (
             <motion.div
               key="roi-calculator"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-8"
             >
               <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive ROI Calculator</h3>
                 <p className="text-gray-600 mb-6">Configure your team size and see real-time savings calculations.</p>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                   <div>
                     <h4 className="font-semibold text-gray-900 mb-4">Team Configuration</h4>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Zurich Team Size: 30</label>
                         <div className="w-full bg-gray-200 rounded-lg h-2">
                           <div className="bg-blue-600 h-2 rounded-lg" style={{ width: '30%' }}></div>
                         </div>
                         <div className="text-sm text-gray-500 mt-1">10 - 100 people</div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Pune Team Size: 70</label>
                         <div className="w-full bg-gray-200 rounded-lg h-2">
                           <div className="bg-green-600 h-2 rounded-lg" style={{ width: '70%' }}></div>
                         </div>
                         <div className="text-sm text-gray-500 mt-1">20 - 200 people</div>
                       </div>
                     </div>
                   </div>
                   
                   <div>
                     <h4 className="font-semibold text-gray-900 mb-4">Annual Savings Calculation</h4>
                     <div className="space-y-3">
                       <div className="flex justify-between">
                         <span className="text-gray-600">Daily Team Cost:</span>
                         <span className="font-semibold">$45,000</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-600">Efficiency Gains:</span>
                         <span className="font-semibold text-green-600">65%</span>
                       </div>
                       <div className="flex justify-between text-lg font-bold border-t pt-2">
                         <span>Total Annual Savings:</span>
                         <span className="text-green-600">$16.7M</span>
                       </div>
                     </div>
                     
                     <button className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                       Export Calculation Report
                     </button>
                   </div>
                 </div>
               </div>
             </motion.div>
           )}

          {activeTab === 'success-stories' && (
            <motion.div
              key="success-stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stories Carousel */}
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Real Impact Stories</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsStoryPlaying(!isStoryPlaying)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {isStoryPlaying ? <Pause className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {successStories.map((story, index) => (
                    <SuccessStoryCard
                      key={index}
                      {...story}
                      isActive={index === currentStoryIndex}
                      index={index}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-6 space-x-2">
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

              <div className="text-center">
                <button className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View All Case Studies →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quick Access Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Access</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={action.onClick}
              className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-200 text-left group"
            >
              <action.icon className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-medium text-gray-900 mb-1">{action.title}</div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Live Activity Sidebar */}
      <AnimatePresence>
        {activitySidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40 border-l border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
                <button
                  onClick={() => setActivitySidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'success' ? 'bg-green-100 text-green-600' :
                      activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{activity.text}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setActivitySidebarOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors z-30"
      >
        <Activity className="w-5 h-5" />
      </button>

      {/* Savings Modal */}
      <SavingsModal 
        isOpen={showSavingsModal} 
        onClose={() => setShowSavingsModal(false)} 
      />
    </div>
  );
} 
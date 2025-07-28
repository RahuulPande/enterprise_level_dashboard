'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Calendar,
  Activity,
  User
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface TestMetrics {
  totalTests: number;
  completed: number;
  passed: number;
  failed: number;
  blocked: number;
  inProgress: number;
  passRate: number;
  velocity: number; // tests per day
}

export default function TestManagementDashboard() {
  const { testExecutions, testTeamMembers } = useDashboardStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  // Generate mock data for demo purposes
  const mockTestExecutions = useMemo(() => [
    { id: '1', testCaseId: 'TC001', testCaseName: 'Login Functionality', module: 'Authentication', assignee: 'Alice Johnson', status: 'passed', executedAt: new Date(), duration: 15, priority: 'high', environment: 'SIT' },
    { id: '2', testCaseId: 'TC002', testCaseName: 'Payment Processing', module: 'Payments', assignee: 'Bob Smith', status: 'failed', executedAt: new Date(), duration: 25, priority: 'critical', environment: 'UAT', defectId: 'DEF001' },
    { id: '3', testCaseId: 'TC003', testCaseName: 'User Registration', module: 'Authentication', assignee: 'Carol Davis', status: 'in-progress', priority: 'medium', environment: 'SIT' },
    { id: '4', testCaseId: 'TC004', testCaseName: 'Balance Inquiry', module: 'Account', assignee: 'David Wilson', status: 'passed', executedAt: new Date(), duration: 10, priority: 'high', environment: 'UAT' },
    { id: '5', testCaseId: 'TC005', testCaseName: 'Transaction History', module: 'Account', assignee: 'Eve Brown', status: 'blocked', priority: 'medium', environment: 'SIT' },
    { id: '6', testCaseId: 'TC006', testCaseName: 'Fund Transfer', module: 'Payments', assignee: 'Frank Miller', status: 'passed', executedAt: new Date(), duration: 30, priority: 'critical', environment: 'UAT' }
  ], []);

  const mockTeamMembers = useMemo(() => [
    { id: '1', name: 'Alice Johnson', role: 'Senior QA Engineer', avatar: '👩‍💻', capacity: 8, currentWorkload: 6.5, productivity: 3.2, passRate: 94 },
    { id: '2', name: 'Bob Smith', role: 'QA Engineer', avatar: '👨‍💻', capacity: 8, currentWorkload: 7.2, productivity: 2.8, passRate: 87 },
    { id: '3', name: 'Carol Davis', role: 'Test Automation Engineer', avatar: '👩‍🔬', capacity: 8, currentWorkload: 5.5, productivity: 4.1, passRate: 96 },
    { id: '4', name: 'David Wilson', role: 'QA Engineer', avatar: '👨‍🔧', capacity: 8, currentWorkload: 8.0, productivity: 2.5, passRate: 89 },
    { id: '5', name: 'Eve Brown', role: 'Performance Tester', avatar: '👩‍💼', capacity: 8, currentWorkload: 4.8, productivity: 3.5, passRate: 92 },
    { id: '6', name: 'Frank Miller', role: 'Senior QA Engineer', avatar: '👨‍🏫', capacity: 8, currentWorkload: 7.5, productivity: 3.8, passRate: 91 }
  ], []);

  // Calculate metrics
  const testMetrics = useMemo((): TestMetrics => {
    const totalTests = mockTestExecutions.length;
    const completed = mockTestExecutions.filter(t => t.status === 'passed' || t.status === 'failed').length;
    const passed = mockTestExecutions.filter(t => t.status === 'passed').length;
    const failed = mockTestExecutions.filter(t => t.status === 'failed').length;
    const blocked = mockTestExecutions.filter(t => t.status === 'blocked').length;
    const inProgress = mockTestExecutions.filter(t => t.status === 'in-progress').length;
    const passRate = completed > 0 ? Math.round((passed / completed) * 100) : 0;
    
    return {
      totalTests,
      completed,
      passed,
      failed,
      blocked,
      inProgress,
      passRate,
      velocity: 12 // Mock velocity
    };
  }, [mockTestExecutions]);

  // Test execution data for charts
  const statusDistribution = [
    { name: 'Passed', value: testMetrics.passed, color: '#10B981' },
    { name: 'Failed', value: testMetrics.failed, color: '#EF4444' },
    { name: 'In Progress', value: testMetrics.inProgress, color: '#F59E0B' },
    { name: 'Blocked', value: testMetrics.blocked, color: '#6B7280' }
  ];

  const moduleProgress = useMemo(() => {
    const modules = ['Authentication', 'Payments', 'Account', 'Reports', 'Admin'];
    return modules.map(module => {
      const moduleTests = mockTestExecutions.filter(t => t.module === module);
      const total = moduleTests.length || 5; // Mock some tests even if none exist
      const passed = moduleTests.filter(t => t.status === 'passed').length;
      const failed = moduleTests.filter(t => t.status === 'failed').length;
      const progress = total > 0 ? Math.round(((passed + failed) / total) * 100) : Math.floor(Math.random() * 100);
      
      return {
        module,
        total,
        completed: passed + failed,
        passed,
        failed,
        progress,
        passRate: passed + failed > 0 ? Math.round((passed / (passed + failed)) * 100) : 0
      };
    });
  }, [mockTestExecutions]);

  const velocityTrend = [
    { day: 'Mon', tests: 8 },
    { day: 'Tue', tests: 12 },
    { day: 'Wed', tests: 10 },
    { day: 'Thu', tests: 15 },
    { day: 'Fri', tests: 9 },
    { day: 'Sat', tests: 6 },
    { day: 'Sun', tests: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWorkloadColor = (workload: number, capacity: number) => {
    const percentage = (workload / capacity) * 100;
    if (percentage > 100) return 'text-red-600 bg-red-100';
    if (percentage > 80) return 'text-orange-600 bg-orange-100';
    if (percentage > 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test Management Dashboard</h2>
          <p className="text-gray-600 mt-1">Test execution progress and team performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Test Cases', value: testMetrics.totalTests, icon: Target, color: 'text-blue-600' },
          { title: 'Pass Rate', value: `${testMetrics.passRate}%`, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Daily Velocity', value: `${testMetrics.velocity}/day`, icon: TrendingUp, color: 'text-purple-600' },
          { title: 'Active Blockers', value: testMetrics.blocked, icon: AlertCircle, color: 'text-red-600' }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Status Distribution</h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-4">
              <div className="space-y-3">
                {statusDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Execution Velocity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Execution Velocity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityTrend}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tests"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Module</h3>
        <div className="space-y-4">
          {moduleProgress.map((module) => (
            <div key={module.module} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{module.module}</h4>
                  <span className="text-sm text-gray-600">{module.completed}/{module.total} tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-center">
                <div className="text-lg font-bold text-gray-900">{module.passRate}%</div>
                <div className="text-xs text-gray-500">Pass Rate</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance & Workload</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{member.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Workload</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member.currentWorkload, member.capacity)}`}>
                    {member.currentWorkload}h / {member.capacity}h
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      member.currentWorkload > member.capacity ? 'bg-red-500' :
                      member.currentWorkload > member.capacity * 0.8 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((member.currentWorkload / member.capacity) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pass Rate</span>
                  <span className="font-medium text-gray-900">{member.passRate}%</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Productivity</span>
                  <span className="font-medium text-gray-900">{member.productivity} tests/hour</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Test Executions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Executions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Environment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTestExecutions.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{test.testCaseName}</div>
                      <div className="text-sm text-gray-500">{test.testCaseId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
                      {test.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.duration ? `${test.duration}m` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.environment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, BarChart3, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ROICalculation {
  zurichTeam: number;
  puneTeam: number;
  totalDailyCost: number;
  incidentReductionSaving: number;
  monitoringReductionSaving: number;
  downtimeReductionSaving: number;
  totalAnnualSavings: number;
  paybackPeriod: number;
  fiveYearNPV: number;
}

export const InteractiveROI = () => {
  const [zurichTeam, setZurichTeam] = useState(30);
  const [puneTeam, setPuneTeam] = useState(70);
  const [showResults, setShowResults] = useState(false);

  const calculation = useMemo((): ROICalculation => {
    const zurichDailyCost = 800;
    const puneDailyCost = 300;
    const totalDailyCost = (zurichTeam * zurichDailyCost) + (puneTeam * puneDailyCost);
    const incidentReductionSaving = totalDailyCost * 0.25; // 25% reduction
    const monitoringReductionSaving = totalDailyCost * 0.40; // 40% reduction
    const downtimeReductionSaving = 500000; // $500k/month
    const totalAnnualSavings = (incidentReductionSaving + monitoringReductionSaving) * 365 + (downtimeReductionSaving * 12);
    const paybackPeriod = Math.round((500000 / (totalAnnualSavings / 365)) * 10) / 10; // Implementation cost / daily savings
    const fiveYearNPV = totalAnnualSavings * 5 - 500000; // 5 years of savings minus implementation cost

    return {
      zurichTeam,
      puneTeam,
      totalDailyCost,
      incidentReductionSaving,
      monitoringReductionSaving,
      downtimeReductionSaving,
      totalAnnualSavings,
      paybackPeriod,
      fiveYearNPV
    };
  }, [zurichTeam, puneTeam]);

  const beforeAfterData = [
    {
      category: 'Incident Resolution',
      before: 6,
      after: 2,
      unit: 'hours'
    },
    {
      category: 'Manual Monitoring',
      before: 8,
      after: 3,
      unit: 'hours/day'
    },
    {
      category: 'Downtime',
      before: 12,
      after: 2,
      unit: 'hours/month'
    },
    {
      category: 'False Positives',
      before: 80,
      after: 16,
      unit: '%'
    }
  ];

  const savingsBreakdown = [
    { name: 'Incident Resolution', value: calculation.incidentReductionSaving * 365, color: '#EF4444' },
    { name: 'Manual Monitoring', value: calculation.monitoringReductionSaving * 365, color: '#F59E0B' },
    { name: 'Downtime Prevention', value: calculation.downtimeReductionSaving * 12, color: '#10B981' }
  ];

  const exportToPDF = () => {
    const content = `
      ROI Calculation Report
      ====================
      
      Team Configuration:
      - Zurich Team: ${zurichTeam} people
      - Pune Team: ${puneTeam} people
      - Total Daily Cost: $${calculation.totalDailyCost.toLocaleString()}
      
      Annual Savings:
      - Incident Resolution: $${(calculation.incidentReductionSaving * 365).toLocaleString()}
      - Manual Monitoring: $${(calculation.monitoringReductionSaving * 365).toLocaleString()}
      - Downtime Prevention: $${(calculation.downtimeReductionSaving * 12).toLocaleString()}
      - Total Annual Savings: $${calculation.totalAnnualSavings.toLocaleString()}
      
      ROI Metrics:
      - Payback Period: ${calculation.paybackPeriod} days
      - 5-Year NPV: $${calculation.fiveYearNPV.toLocaleString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ROI_Calculation_Report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Team Size Sliders */}
      <div 
        className="rounded-2xl p-8 border border-white/20 shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Team Configuration</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Zurich Team Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-white font-semibold">Zurich Team Size</label>
              <span className="text-white/80">{zurichTeam} people</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={zurichTeam}
              onChange={(e) => setZurichTeam(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/60 mt-2">
              <span>10</span>
              <span>100</span>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Daily Cost: ${(zurichTeam * 800).toLocaleString()}
            </div>
          </div>

          {/* Pune Team Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-white font-semibold">Pune Team Size</label>
              <span className="text-white/80">{puneTeam} people</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              value={puneTeam}
              onChange={(e) => setPuneTeam(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-white/60 mt-2">
              <span>20</span>
              <span>200</span>
            </div>
            <div className="mt-2 text-sm text-white/80">
              Daily Cost: ${(puneTeam * 300).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Total Cost Display */}
        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              ${calculation.totalDailyCost.toLocaleString()}
            </div>
            <div className="text-white/80">Total Daily Operational Cost</div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <motion.button
          onClick={() => setShowResults(true)}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Calculate My Savings
        </motion.button>
      </div>

      {/* Results Section */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Annual Savings */}
          <div 
            className="rounded-2xl p-8 border border-white/20 shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Annual Savings Breakdown</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-500/20 rounded-xl">
                <DollarSign className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${(calculation.incidentReductionSaving * 365).toLocaleString()}
                </div>
                <div className="text-white/80">Incident Resolution</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/20 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${(calculation.monitoringReductionSaving * 365).toLocaleString()}
                </div>
                <div className="text-white/80">Manual Monitoring</div>
              </div>
              <div className="text-center p-4 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${(calculation.downtimeReductionSaving * 12).toLocaleString()}
                </div>
                <div className="text-white/80">Downtime Prevention</div>
              </div>
            </div>
          </div>

          {/* Before vs After Chart */}
          <div 
            className="rounded-2xl p-8 border border-white/20 shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Before vs After Implementation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={beforeAfterData}>
                <XAxis dataKey="category" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="before" fill="#EF4444" name="Before" />
                <Bar dataKey="after" fill="#10B981" name="After" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ROI Metrics */}
          <div 
            className="rounded-2xl p-8 border border-white/20 shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white drop-shadow-md">ROI Metrics</h3>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4 text-white" />
                <span className="text-white">Export</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                <div className="text-4xl font-bold text-white">
                  ${calculation.totalAnnualSavings.toLocaleString()}
                </div>
                <div className="text-white/80">Total Annual Savings</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                <div className="text-4xl font-bold text-white">
                  {calculation.paybackPeriod}
                </div>
                <div className="text-white/80">Days to Payback</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                <div className="text-4xl font-bold text-white">
                  ${calculation.fiveYearNPV.toLocaleString()}
                </div>
                <div className="text-white/80">5-Year NPV</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Calculator, TrendingUp, Users, Globe, DollarSign, ArrowRight, FileText, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnimatedCounter, GlowingAnimatedCounter } from './AnimatedMetrics';

interface ROICalculation {
  zurichTeam: { count: number; dailyCost: number };
  puneTeam: { count: number; dailyCost: number };
  totalDailyCost: number;
  annualCost: number;
  incidentReductionSaving: number;
  monitoringReductionSaving: number;
  downtimeReductionSaving: number;
  totalAnnualSavings: number;
  paybackPeriod: number;
  fiveYearNPV: number;
}

// Custom Slider Component
const CustomSlider = ({ 
  value, 
  onChange, 
  min, 
  max, 
  label, 
  color = "#10B981",
  icon: Icon 
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
  color?: string;
  icon: any;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-600">Team Size</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">people</div>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Custom thumb styling */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${color};
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${color};
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            border: none;
          }
        `}</style>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Comparison Chart Component
const ComparisonChart = ({ beforeData, afterData }: { beforeData: any, afterData: any }) => {
  const chartData = [
    {
      category: 'Daily Cost',
      before: beforeData.totalDailyCost,
      after: afterData.totalDailyCost - afterData.dailySavings,
    },
    {
      category: 'Annual Cost',
      before: beforeData.annualCost / 1000000,
      after: (afterData.annualCost - afterData.totalAnnualSavings) / 1000000,
    },
    {
      category: 'Incident Resolution',
      before: 6,
      after: 4.5,
    },
    {
      category: 'Manual Monitoring',
      before: 100,
      after: 60,
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Before vs After Implementation</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="before" fill="#EF4444" name="Before" radius={[4, 4, 0, 0]} />
          <Bar dataKey="after" fill="#10B981" name="After" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="font-semibold text-red-700">Before</span>
          </div>
          <p className="text-sm text-red-600">Manual processes, reactive monitoring</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="font-semibold text-green-700">After</span>
          </div>
          <p className="text-sm text-green-600">AI-powered automation, predictive insights</p>
        </div>
      </div>
    </motion.div>
  );
};

export const InteractiveROI = () => {
  const [zurichTeamSize, setZurichTeamSize] = useState(30);
  const [puneTeamSize, setPuneTeamSize] = useState(70);
  const [showCalculation, setShowCalculation] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // ROI Calculation Logic
  const roiCalculation = useMemo((): ROICalculation => {
    const zurichDailyCost = 800; // per person per day
    const puneDailyCost = 300; // per person per day
    
    const zurichTeam = { count: zurichTeamSize, dailyCost: zurichDailyCost };
    const puneTeam = { count: puneTeamSize, dailyCost: puneDailyCost };
    
    const totalDailyCost = (zurichTeam.count * zurichTeam.dailyCost) + (puneTeam.count * puneTeam.dailyCost);
    const annualCost = totalDailyCost * 365;
    
    // Savings calculations
    const incidentReductionSaving = totalDailyCost * 0.25; // 25% reduction
    const monitoringReductionSaving = totalDailyCost * 0.40; // 40% reduction
    const downtimeReductionSaving = 500000; // $500k/month
    
    const totalAnnualSavings = (incidentReductionSaving + monitoringReductionSaving) * 365 + (downtimeReductionSaving * 12);
    
    // Implementation cost (estimated at $200k)
    const implementationCost = 200000;
    const paybackPeriod = Math.ceil(implementationCost / (totalAnnualSavings / 365));
    const fiveYearNPV = (totalAnnualSavings * 5) - implementationCost;
    
    return {
      zurichTeam,
      puneTeam,
      totalDailyCost,
      annualCost,
      incidentReductionSaving,
      monitoringReductionSaving,
      downtimeReductionSaving,
      totalAnnualSavings,
      paybackPeriod,
      fiveYearNPV
    };
  }, [zurichTeamSize, puneTeamSize]);

  // Generate PDF Export
  const exportToPDF = async () => {
    if (!calculatorRef.current) return;
    
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(calculatorRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Add title page
      pdf.setFontSize(24);
      pdf.text('ROI Calculation Report', 20, 30);
      pdf.setFontSize(12);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
      pdf.text(`Team Configuration: Zurich (${zurichTeamSize}), Pune (${puneTeamSize})`, 20, 50);
      
      // Add main content
      pdf.addImage(imgData, 'PNG', 0, 60, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`ROI-Calculation-${zurichTeamSize}-${puneTeamSize}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const beforeData = {
    totalDailyCost: roiCalculation.totalDailyCost,
    annualCost: roiCalculation.annualCost
  };

  const afterData = {
    totalDailyCost: roiCalculation.totalDailyCost,
    annualCost: roiCalculation.annualCost,
    dailySavings: roiCalculation.incidentReductionSaving + roiCalculation.monitoringReductionSaving,
    totalAnnualSavings: roiCalculation.totalAnnualSavings
  };

  return (
    <div ref={calculatorRef} className="space-y-8">
      {/* Interactive Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        <CustomSlider
          value={zurichTeamSize}
          onChange={setZurichTeamSize}
          min={10}
          max={100}
          label="Zurich Team"
          color="#3B82F6"
          icon={Globe}
        />
        
        <CustomSlider
          value={puneTeamSize}
          onChange={setPuneTeamSize}
          min={20}
          max={200}
          label="Pune Team"
          color="#10B981"
          icon={Users}
        />
      </div>

      {/* Real-time Cost Display */}
      <motion.div
        layout
        className="grid md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Daily Cost</h3>
              <p className="text-sm text-gray-600">Current operational cost</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            <AnimatedCounter 
              end={roiCalculation.totalDailyCost} 
              prefix="$" 
              duration={1000}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Annual Savings</h3>
              <p className="text-sm text-gray-600">Projected yearly savings</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">
            <GlowingAnimatedCounter 
              end={roiCalculation.totalAnnualSavings / 1000000} 
              prefix="$" 
              suffix="M"
              decimals={1}
              glowColor="#10B981"
              duration={1500}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Payback Period</h3>
              <p className="text-sm text-gray-600">Time to break even</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600">
            <AnimatedCounter 
              end={roiCalculation.paybackPeriod} 
              suffix=" days"
              duration={1000}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Calculate Button */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCalculation(!showCalculation)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
        >
          <Calculator className="w-6 h-6" />
          <span>{showCalculation ? 'Hide' : 'Calculate My Savings'}</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Detailed Calculation Results */}
      <AnimatePresence>
        {showCalculation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Detailed Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Breakdown</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Zurich Team ({zurichTeamSize} people)</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      <AnimatedCounter end={zurichTeamSize * 800} prefix="$" suffix="/day" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900">Pune Team ({puneTeamSize} people)</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      <AnimatedCounter end={puneTeamSize * 300} prefix="$" suffix="/day" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                    <span className="text-lg font-bold text-gray-900">Total Daily Cost</span>
                    <span className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={roiCalculation.totalDailyCost} prefix="$" suffix="/day" />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-6">ROI Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Annual Savings:</span>
                    <span className="font-bold">
                      <AnimatedCounter 
                        end={roiCalculation.totalAnnualSavings / 1000000} 
                        prefix="$" 
                        suffix="M" 
                        decimals={1}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback Period:</span>
                    <span className="font-bold">{roiCalculation.paybackPeriod} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-Year NPV:</span>
                    <span className="font-bold">
                      <AnimatedCounter 
                        end={roiCalculation.fiveYearNPV / 1000000} 
                        prefix="$" 
                        suffix="M" 
                        decimals={1}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-bold">
                      <AnimatedCounter 
                        end={((roiCalculation.totalAnnualSavings / 200000) - 1) * 100} 
                        suffix="%" 
                        decimals={0}
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comparison Chart */}
            <ComparisonChart beforeData={beforeData} afterData={afterData} />

            {/* Export Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToPDF}
                disabled={isExporting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Export as PDF</span>
                    <FileText className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 
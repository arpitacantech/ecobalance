import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Header } from './Header';
import { Download, Lightbulb, TrendingDown, CheckCircle2 } from 'lucide-react';
import { EmissionsData } from '../App';

interface EmissionsReportProps {
  emissionsData: EmissionsData;
  totalEmissions: number;
}

export function EmissionsReport({ emissionsData, totalEmissions }: EmissionsReportProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const chartData = [
    { name: 'Energy', value: emissionsData.energy, color: '#3BAA67' },
    { name: 'Food Procurement', value: emissionsData.procurement, color: '#4ECDC4' },
    { name: 'Waste', value: emissionsData.waste, color: '#FFD166' },
    { name: 'Transport', value: emissionsData.transport, color: '#FF6B6B' },
  ];

  const recommendations = [
    {
      title: 'Switch to LED lighting',
      savings: '0.2 tCO₂e',
      impact: 'high',
    },
    {
      title: 'Reduce food waste by 15%',
      savings: '0.1 tCO₂e',
      impact: 'medium',
    },
    {
      title: 'Optimize delivery routes',
      savings: '0.08 tCO₂e',
      impact: 'medium',
    },
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDownloading(false);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="report" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        {/* Header Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2">Quarterly Emissions Report</h1>
              <p className="text-muted-foreground">Q1 2026 (Jan - Mar)</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Total Emissions</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl text-primary">{totalEmissions.toFixed(1)}</span>
                <span className="text-xl text-muted-foreground">tCO₂e</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Emissions Breakdown Chart */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl shadow-lg p-8"
          >
            <h3 className="mb-6">Emissions by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    label={{ value: 'tCO₂e', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)} tCO₂e`, 'Emissions']}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Breakdown List */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl shadow-lg p-8"
          >
            <h3 className="mb-6">Detailed Breakdown</h3>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl">{item.value.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">tCO₂e</span>
                  </div>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
                  <span>Total</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-primary">{totalEmissions.toFixed(1)}</span>
                    <span className="text-sm text-primary">tCO₂e</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h3>Recommendations to Reduce Emissions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="mb-2">{rec.title}</div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary">Save {rec.savings}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Impact:
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      rec.impact === 'high'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-chart-3/20 text-chart-3'
                    }`}
                  >
                    {rec.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-3 px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wide ${
              downloaded
                ? 'bg-primary/20 text-primary'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Downloaded
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                {isDownloading ? 'Generating PDF...' : 'Download PDF'}
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

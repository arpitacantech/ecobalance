import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Header } from './Header';
import { Plus, FileText, Zap, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { EmissionsData } from '../App';

interface DashboardProps {
  emissionsData: EmissionsData;
  totalEmissions: number;
}

export function Dashboard({ emissionsData, totalEmissions }: DashboardProps) {
  const navigate = useNavigate();

  const chartData = [
    { name: 'Energy', value: emissionsData.energy, color: '#3BAA67', icon: Zap },
    { name: 'Procurement', value: emissionsData.procurement, color: '#4ECDC4', icon: ShoppingBag },
    { name: 'Waste', value: emissionsData.waste, color: '#FFD166', icon: Trash2 },
    { name: 'Transport', value: emissionsData.transport, color: '#FF6B6B', icon: Truck },
  ];

  const percentage = (value: number) => ((value / totalEmissions) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="dashboard" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        {/* Main Metric Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="mb-2">Your Carbon Footprint This Month</h2>
          <div className="flex items-baseline gap-2">
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-6xl text-primary"
            >
              {totalEmissions.toFixed(1)}
            </motion.span>
            <span className="text-2xl text-muted-foreground">tCO₂e</span>
          </div>
        </motion.div>

        {/* Emissions Breakdown */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="mb-6">Emissions Breakdown</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value.toFixed(2)} tCO₂e`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
              {chartData.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{category.name}</div>
                        <div className="mt-0.5">{category.value.toFixed(2)} tCO₂e</div>
                      </div>
                    </div>
                    <div className="text-2xl" style={{ color: category.color }}>
                      {percentage(category.value)}%
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <button
            onClick={() => navigate('/add-data')}
            className="bg-primary text-primary-foreground p-8 rounded-2xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-wide">Add Data</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Upload bills and operational data
            </p>
          </button>

          <button
            onClick={() => navigate('/report')}
            className="bg-card border-2 border-primary text-primary p-8 rounded-2xl hover:bg-primary/5 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-wide">Generate Report</span>
            </div>
            <p className="text-sm text-muted-foreground">
              View quarterly emissions summary
            </p>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from './Header';
import { Upload, Zap, ShoppingBag, Trash2, Truck, CheckCircle2 } from 'lucide-react';
import { EmissionsData } from '../App';

interface AddDataProps {
  updateEmissions: (data: Partial<EmissionsData>) => void;
}

export function AddData({ updateEmissions }: AddDataProps) {
  const navigate = useNavigate();
  const [energyFile, setEnergyFile] = useState<File | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [wasteWeight, setWasteWeight] = useState('');
  const [deliveryMileage, setDeliveryMileage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate new emissions based on inputs
    const newEmissions: Partial<EmissionsData> = {
      energy: energyFile ? 1.6 : 1.4,
      procurement: invoiceFile ? 1.2 : 1.0,
      waste: wasteWeight ? parseFloat(wasteWeight) * 0.001 + 0.7 : 0.7,
      transport: deliveryMileage ? parseFloat(deliveryMileage) * 0.0002 + 0.4 : 0.4,
    };

    updateEmissions(newEmissions);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Redirect to dashboard after success
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentPage="add-data" />
        <div className="max-w-4xl mx-auto px-6 py-16 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl shadow-lg p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-primary/10 p-6 rounded-full mb-6"
            >
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </motion.div>
            <h2 className="mb-4">Data Uploaded Successfully!</h2>
            <p className="text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="add-data" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 py-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card rounded-2xl shadow-lg p-8"
        >
          <h1 className="mb-2">Upload Your Business Data</h1>
          <p className="text-muted-foreground mb-8">
            Add your operational data to calculate carbon emissions
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Energy Bill Upload */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 border-2 border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-chart-1/10 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-chart-1" />
                </div>
                <label className="flex-1">Upload Energy Bill</label>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileChange(e, setEnergyFile)}
                  className="hidden"
                  id="energy-file"
                />
                <label
                  htmlFor="energy-file"
                  className="flex items-center justify-center gap-2 w-full p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {energyFile ? energyFile.name : 'Choose file (PDF, JPG, PNG)'}
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Supplier Invoice Upload */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 border-2 border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-chart-2/10 p-3 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-chart-2" />
                </div>
                <label className="flex-1">Upload Supplier Invoice</label>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileChange(e, setInvoiceFile)}
                  className="hidden"
                  id="invoice-file"
                />
                <label
                  htmlFor="invoice-file"
                  className="flex items-center justify-center gap-2 w-full p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {invoiceFile ? invoiceFile.name : 'Choose file (PDF, JPG, PNG)'}
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Waste Weight Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 border-2 border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-chart-3/10 p-3 rounded-lg">
                  <Trash2 className="w-6 h-6 text-chart-3" />
                </div>
                <label htmlFor="waste-weight" className="flex-1">
                  Enter Waste Weight
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="waste-weight"
                  value={wasteWeight}
                  onChange={(e) => setWasteWeight(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="flex-1 p-4 bg-muted/50 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                />
                <span className="text-muted-foreground">kg</span>
              </div>
            </motion.div>

            {/* Delivery Mileage Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 border-2 border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-chart-4/10 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-chart-4" />
                </div>
                <label htmlFor="delivery-mileage" className="flex-1">
                  Enter Delivery Mileage
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="delivery-mileage"
                  value={deliveryMileage}
                  onChange={(e) => setDeliveryMileage(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="flex-1 p-4 bg-muted/50 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
                />
                <span className="text-muted-foreground">miles</span>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Submit'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

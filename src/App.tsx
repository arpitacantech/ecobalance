import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { AddData } from './components/AddData';
import { EmissionsReport } from './components/EmissionsReport';

export interface EmissionsData {
  energy: number;
  procurement: number;
  waste: number;
  transport: number;
}

function App() {
  const [emissionsData, setEmissionsData] = useState<EmissionsData>({
    energy: 1.4,
    procurement: 1.0,
    waste: 0.7,
    transport: 0.4,
  });

  const totalEmissions = Object.values(emissionsData).reduce((a, b) => a + b, 0);

  const updateEmissions = (newData: Partial<EmissionsData>) => {
    setEmissionsData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route 
          path="/dashboard" 
          element={<Dashboard emissionsData={emissionsData} totalEmissions={totalEmissions} />} 
        />
        <Route 
          path="/add-data" 
          element={<AddData updateEmissions={updateEmissions} />} 
        />
        <Route 
          path="/report" 
          element={<EmissionsReport emissionsData={emissionsData} totalEmissions={totalEmissions} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

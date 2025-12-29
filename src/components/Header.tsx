import { useNavigate } from 'react-router-dom';
import { Leaf, Home, FileText, Plus } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
<button
  onClick={() => navigate('/dashboard')}
  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
>
  <img
    src="/images/logo3.png"
    alt="GreenStep Logo"
    style={{ height: "54px", width: "auto" }}
  />
</button>
 

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'dashboard' 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/add-data')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'add-data' 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Data
          </button>
          <button
            onClick={() => navigate('/report')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'report' 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <FileText className="w-4 h-4" />
            Report
          </button>
        </nav>
      </div>
    </header>
  );
}

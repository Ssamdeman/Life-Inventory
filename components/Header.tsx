import React from 'react';
import { ChevronLeft, Package } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  path: Category[];
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ path, onBack }) => {
  const currentCategory = path[path.length - 1];
  const isRoot = path.length === 1;

  return (
    <header className="bg-warm-cream/80 backdrop-blur-md sticky top-0 z-10 px-4 py-3 flex items-center">
      {!isRoot ? (
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 mr-2 text-slate-gray hover:bg-slate-gray/10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="p-2 -ml-2 mr-2 text-slate-gray">
          <Package className="w-6 h-6" />
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold text-primary-text leading-tight">
          {isRoot ? 'My Inventory' : currentCategory.name}
        </h1>
        {!isRoot && (
          <p className="text-xs text-slate-gray font-medium truncate">
            {path.slice(0, -1).map(p => p.name).join(' > ')}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
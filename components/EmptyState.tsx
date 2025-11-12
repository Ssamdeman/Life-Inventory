import React from 'react';
import { Package } from 'lucide-react';

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in-50 duration-500">
    <div className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center mb-4">
      <Package className="w-8 h-8 text-secondary-text/80" />
    </div>
    <p className="text-primary-text font-medium">This space is empty.</p>
    <p className="text-sm text-secondary-text mt-1">Tap the + button to add your first item.</p>
  </div>
);

export default EmptyState;
import React from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  item: Category;
  onClick: (item: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onClick, onDelete }) => (
  <div
    className="flex items-center justify-between w-full p-4 pr-2 mb-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/50 group"
  >
    <button
      onClick={() => onClick(item)}
      className="flex items-center space-x-4 flex-grow text-left"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-warm-cream rounded-full text-xl flex-shrink-0">
        {item.icon || '📦'}
      </div>
      <span className="text-lg font-medium text-primary-text">{item.name}</span>
    </button>
    <div className="flex items-center flex-shrink-0">
       <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
        className="p-2 text-slate-gray/60 hover:text-red-500 rounded-full transition-colors"
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <button 
        onClick={() => onClick(item)}
        className="p-2 text-slate-gray"
        aria-label={`Open ${item.name}`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default CategoryCard;
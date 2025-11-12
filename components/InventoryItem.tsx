import React from 'react';
import { Trash2 } from 'lucide-react';
import { InventoryItem as InventoryItemType } from '../types';

interface InventoryItemProps {
  item: InventoryItemType;
  onDelete: (id: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onDelete }) => (
  <div className="flex items-center justify-between w-full p-3 mb-2 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 border-l-4 border-slate-gray animate-in fade-in-50 duration-300">
    <div className="flex flex-col">
      <span className="font-medium text-primary-text">{item.name}</span>
      <span className="text-sm text-slate-gray mt-1">
        Created: {item.createdAt?.toLocaleDateString() || 'now'}
      </span>
    </div>
    <button
      onClick={() => onDelete(item.id)}
      className="p-2 text-slate-gray/60 hover:text-red-500 rounded-full transition-colors"
      aria-label={`Delete ${item.name}`}
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
);

export default InventoryItem;
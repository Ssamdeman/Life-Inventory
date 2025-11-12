import React, { useState, FormEvent, useEffect, useRef } from 'react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, icon: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), icon.trim() || '📦');
      setName('');
      setIcon('');
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-sm rounded-xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-primary-text mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Category Name (e.g., Office)"
              className="w-full p-3 bg-warm-cream/50 rounded-md border border-slate-300 focus:ring-2 focus:ring-slate-gray focus:border-slate-gray text-lg text-primary-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
             <input
              type="text"
              placeholder="Icon (e.g., 💼) (optional)"
              className="w-full p-3 bg-warm-cream/50 rounded-md border border-slate-300 focus:ring-2 focus:ring-slate-gray focus:border-slate-gray text-lg text-primary-text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 rounded-md font-semibold text-primary-text bg-slate-200/80 hover:bg-slate-300/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 p-3 rounded-md font-semibold text-white bg-slate-gray hover:opacity-90 transition-opacity"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
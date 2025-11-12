import React, { useState, FormEvent, useEffect, useRef } from 'react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newItemName, setNewItemName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAdd(newItemName.trim());
      setNewItemName('');
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
        <h3 className="text-xl font-bold text-primary-text mb-4">Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you adding?"
            className="w-full p-3 bg-warm-cream/50 rounded-md border border-slate-300 focus:ring-2 focus:ring-slate-gray focus:border-slate-gray text-lg mb-4 text-primary-text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <div className="flex space-x-3 mt-2">
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
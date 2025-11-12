import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import { Category, InventoryItem as InventoryItemType } from './types';
import { CATEGORY_STRUCTURE } from './constants/categories';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import InventoryItem from './components/InventoryItem';
import AddItemModal from './components/AddItemModal';
import AddCategoryModal from './components/AddCategoryModal';
import EmptyState from './components/EmptyState';

// --- Helper Functions for Immutable Updates ---

const findAndRemoveCategory = (node: Category, categoryId: string): Category | null => {
  if (node.children) {
    const newChildren = node.children.filter(child => child.id !== categoryId);
    if (newChildren.length < node.children.length) {
      return { ...node, children: newChildren };
    }
    for (const child of node.children) {
      const result = findAndRemoveCategory(child, categoryId);
      if (result) {
        return { ...node, children: node.children.map(c => c.id === child.id ? result : c) };
      }
    }
  }
  return null;
}

const findAndAddCategory = (node: Category, parentId: string, newCategory: Category): Category | null => {
    if(node.id === parentId) {
        return {...node, children: [...(node.children || []), newCategory]};
    }
    if (node.children) {
        for (const child of node.children) {
            const result = findAndAddCategory(child, parentId, newCategory);
            if(result) {
                return {...node, children: node.children.map(c => c.id === child.id ? result : c)};
            }
        }
    }
    return null;
}

const getAllDescendantIds = (category: Category | undefined): string[] => {
    if (!category) return [];
    let ids = [category.id];
    if (category.children) {
        for (const child of category.children) {
            ids = [...ids, ...getAllDescendantIds(child)];
        }
    }
    return ids;
}

const findCategoryById = (node: Category, id: string): Category | undefined => {
    if (node.id === id) return node;
    if (node.children) {
        for(const child of node.children) {
            const found = findCategoryById(child, id);
            if (found) return found;
        }
    }
    return undefined;
}


const App: React.FC = () => {
  const [categoryStructure, setCategoryStructure] = useState<Category>(CATEGORY_STRUCTURE);
  const [path, setPath] = useState<Category[]>([categoryStructure]);
  const [allItems, setAllItems] = useState<InventoryItemType[]>([]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState<boolean>(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState<boolean>(false);

  const currentCategory = path[path.length - 1];
  const isLeafCategory = !currentCategory.children || currentCategory.children.length === 0;

  const displayedItems = allItems
    .filter(item => item.categoryId === currentCategory.id)
    .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));

  const handleNavigate = (category: Category) => {
    setPath([...path, category]);
  };

  const handleBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
    }
  };

  const handleAddItem = (name: string) => {
    const trimmedName = name.trim();
    const isDuplicate = displayedItems.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`An item named "${trimmedName}" already exists in this category.`);
      return;
    }
    
    const newItem: InventoryItemType = {
      id: `item-${Date.now()}`, 
      name: trimmedName,
      categoryId: currentCategory.id,
      categoryName: currentCategory.name, 
      createdAt: new Date(),
    };
    setAllItems(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = (itemId: string) => {
    setAllItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleAddCategory = (name: string, icon: string) => {
    const trimmedName = name.trim();
    const siblings = currentCategory.children || [];
    const isDuplicate = siblings.some(
      (child) => child.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`A category named "${trimmedName}" already exists here.`);
      return;
    }

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: trimmedName,
      icon,
      children: []
    };
    const updatedStructure = findAndAddCategory(categoryStructure, currentCategory.id, newCategory);
    if(updatedStructure) {
      setCategoryStructure(updatedStructure);
      // Also update the path to reflect the new structure in the current view
      const updatedCurrentCategory = findCategoryById(updatedStructure, currentCategory.id);
      if (updatedCurrentCategory) {
        setPath([...path.slice(0, -1), updatedCurrentCategory]);
      }
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = findCategoryById(categoryStructure, categoryId);
    if (!categoryToDelete) return;
    
    const confirmDelete = window.confirm(`Are you sure you want to delete "${categoryToDelete.name}"? This will also delete all of its subcategories and items.`);
    if (!confirmDelete) return;

    const idsToDelete = getAllDescendantIds(categoryToDelete);
    setAllItems(prev => prev.filter(item => !idsToDelete.includes(item.categoryId)));
    
    const updatedStructure = findAndRemoveCategory(categoryStructure, categoryId);
    if(updatedStructure) {
      setCategoryStructure(updatedStructure);
      // Also update the path to reflect the new structure in the current view
      const updatedCurrentCategory = findCategoryById(updatedStructure, currentCategory.id);
      if (updatedCurrentCategory) {
        setPath([...path.slice(0, -1), updatedCurrentCategory]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream font-sans pb-28">
      <Header path={path} onBack={handleBack} />

      <main className="p-4 max-w-md mx-auto">
        {!isLeafCategory ? (
          <div>
            <div className="flex justify-between items-center mb-3">
                <div className="text-xs font-bold text-secondary-text uppercase tracking-wider ml-1">
                Categories
                </div>
                <button 
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  className="flex items-center space-x-1 text-sm font-semibold text-slate-gray hover:opacity-80 transition-opacity p-2 -m-2"
                  >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
            </div>
            {currentCategory.children?.map((child) => (
              <CategoryCard key={child.id} item={child} onClick={handleNavigate} onDelete={handleDeleteCategory} />
            ))}
          </div>
        ) : (
          <div>
            {displayedItems.length > 0 && (
                 <div className="text-xs font-bold text-secondary-text uppercase tracking-wider mb-3 ml-1">
                  Items in {currentCategory.name}
                </div>
            )}
            {displayedItems.length === 0 ? (
              <EmptyState />
            ) : (
              displayedItems.map((item) => (
                <InventoryItem key={item.id} item={item} onDelete={handleDeleteItem} />
              ))
            )}
          </div>
        )}
      </main>

      {isLeafCategory && (
        <button
          onClick={() => setIsAddItemModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-slate-gray text-white rounded-full shadow-lg shadow-slate-gray/20 flex items-center justify-center active:scale-90 transition-all z-20"
          aria-label="Add new item"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAdd={handleAddItem}
      />
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default App;
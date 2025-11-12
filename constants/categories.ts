
import { Category } from '../types';

export const CATEGORY_STRUCTURE: Category = {
  id: 'root',
  name: 'Home',
  type: 'root',
  children: [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '🔌',
      children: [
        { id: 'car', name: 'Car', icon: '🚗' },
        { id: 'appliances', name: 'Appliances', icon: '🍳' },
      ],
    },
    {
      id: 'closet',
      name: 'Closet',
      icon: '👕',
      children: [
        {
          id: 'wardrobe',
          name: 'Wardrobe',
          icon: '👗',
          children: [
            { id: 'hat', name: 'Hats', icon: '🧢' },
            { id: 'accessories', name: 'Accessories', icon: '🧣' },
            { id: 'top', name: 'Tops', icon: '👕' },
            { id: 'bottom', name: 'Bottoms', icon: '👖' },
            { id: 'shoes', name: 'Shoes', icon: '👟' },
          ],
        },
        { id: 'linens', name: 'Linens / Bedding', icon: '🛏️' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      icon: '🍽️',
      children: [
        {
          id: 'food',
          name: 'Food',
          icon: '🍎',
          children: [
            { id: 'fav_tab', name: 'Favorites', icon: '⭐' },
            { id: 'meals', name: 'Meals', icon: '🥘' },
          ],
        },
        { id: 'utilities', name: 'Utilities', icon: '🔪' },
        { id: 'dishes', name: 'Dishes', icon: '🥣' },
      ],
    },
    {
      id: 'garage',
      name: 'Garage',
      icon: '🔧',
      children: [{ id: 'tools', name: 'Tools', icon: '🔨' }],
    },
    {
      id: 'hygiene',
      name: 'Personal Hygiene',
      icon: '🚿',
      children: [
        { id: 'bathrooms', name: 'Bathrooms', icon: '🚽' },
        { id: 'toiletries', name: 'Toiletries', icon: '🧴' },
      ],
    },
    { id: 'cleaners', name: 'Cleaners', icon: '🧹' },
    { id: 'medicine', name: 'Medicine', icon: '💊' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️' },
    { id: 'documents', name: 'Documents', icon: '📄' },
  ],
};

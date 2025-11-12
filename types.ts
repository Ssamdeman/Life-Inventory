export interface Category {
  id: string;
  name: string;
  type?: string;
  icon?: string;
  children?: Category[];
}

export interface InventoryItemData {
  name: string;
  categoryId: string;
  categoryName: string;
  createdAt: Date;
}

export interface InventoryItem extends InventoryItemData {
  id: string;
}

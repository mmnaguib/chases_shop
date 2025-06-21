export interface ICategory {
  _id: string;
  name: string;
  createdAt?: Date;
}

export interface IItem {
  _id: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  categoryId: { name: string };
  image?: string;
  createdAt?: Date;
  quantity: number;
}

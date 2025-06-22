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

export interface IUser {
  _id: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  createdAt?: Date;
}

export interface IInvoice {
  type: string;
  date: string;
  userId: { name: string };
  items: [
    {
      productId: string;
      unitPrice: number;
      qunatity: number;
    }
  ];
  discount: string;
  notes: string;
  totalPrice: number;
  finalPrice: number;
  paymentMethods: [{ method: string; amount: number }];
  remaining: number;
  invoiceNumber: string;
}

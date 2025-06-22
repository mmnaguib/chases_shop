import axiosInstance from "./axiosInstance";

const InvoicesApi = {
  addNewInvoice: async (
    type: string,
    date: string,
    userId: string,
    items: [
      {
        productId: string;
        unitPrice: number;
        qunatity: number;
      }
    ],
    discount: number,
    notes: string,
    totalPrice: number,
    finalPrice: number,
    paymentMethods: { method: string; amount: number }[],
    remaining: number
  ) => {
    return await axiosInstance.post("/invoices", {
      type,
      date,
      userId,
      items,
      discount,
      notes,
      totalPrice,
      finalPrice,
      paymentMethods,
      remaining,
    });
  },

  getAllInvoices: async (invoiceType: string) => {
    return await axiosInstance.get(`/invoices?type=${invoiceType}`);
  },

  payAgain: async (
    invoiceId: string,
    localPayments: { method: string; amount: number }[]
  ) => {
    return await axiosInstance.post(`/invoices/${invoiceId}/pay`, {
      localPayments,
    });
  },

  getUserInvoices: async (userId: string) => {
    return await axiosInstance.get(`/invoices/by-user/${userId}`);
  },
};

export default InvoicesApi;

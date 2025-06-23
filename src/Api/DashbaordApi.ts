import axiosInstance from "./axiosInstance";

const DshaboardApi = {
  getUsersCount: async (type: string) => {
    return await axiosInstance.get("/dashboard/users-count", {
      params: { type },
    });
  },
  getInvoicesCount: async (type: string) => {
    return await axiosInstance.get("/dashboard/invoices-count", {
      params: { type },
    });
  },

  getTotalSoldQunatity: async () => {
    return await axiosInstance.get("/dashboard/total-sold");
  },

  getTopProducts: async () => {
    return await axiosInstance.get("/dashboard/top-products");
  },
};

export default DshaboardApi;

import axiosInstance from "./axiosInstance";

const ItemsApi = {
  getitems: async () => {
    try {
      const res = await axiosInstance.get("products");
      return res;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

  getItemById: async (ItemId: string) => {
    try {
      const res = await axiosInstance.get(`products/${ItemId}`);
      return res;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

  addNewItem: async (formData: FormData) => {
    try {
      const res = await axiosInstance.post("products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (error) {
      console.error("Error adding new Item:", error);
      throw error;
    }
  },

  updateItem: async (formData: FormData, ItemId: string) => {
    try {
      const res = await axiosInstance.put(`products/${ItemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      console.error("Error updating Item:", error);
      throw error;
    }
  },

  deleteItem: async (ItemId: string) => {
    try {
      const res = await axiosInstance.delete(`products/${ItemId}`);
      return res;
    } catch (error) {
      console.error("Error deleting Item:", error);
      throw error;
    }
  },
};

export default ItemsApi;

import axiosInstance from "./axiosInstance";

const categoriesApi = {
  getCategories: async () => {
    try {
      const res = await axiosInstance.get("categories");
      return res;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getCategoryById: async (categoryId: string) => {
    try {
      const res = await axiosInstance.get(`categories/${categoryId}`);
      return res;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  addNewCategory: async (categoryName: string) => {
    try {
      const res = await axiosInstance.post("categories", {
        name: categoryName,
      });
      return res;
    } catch (error) {
      console.error("Error adding new category:", error);
      throw error;
    }
  },

  updateCategory: async (categoryId: string, categoryName: string) => {
    try {
      const res = await axiosInstance.put(`categories/${categoryId}`, {
        name: categoryName,
      });
      return res;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  deleteCategory: async (categoryId: string) => {
    try {
      const res = await axiosInstance.delete(`categories/${categoryId}`);
      return res;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },
};

export default categoriesApi;

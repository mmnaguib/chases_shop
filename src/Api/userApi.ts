import axiosInstance from "./axiosInstance";

const UsersApi = {
  addNewUser: async (
    name: string,
    phone: string,
    address: string,
    type: string
  ) => {
    const res = await axiosInstance.post("/users", {
      name,
      phone,
      address,
      type,
    });
    return res;
  },

  getAllByType: async (type: string) => {
    return await axiosInstance.get(`/users?type=${type}`);
  },

  deleteUser: async (id: string) => {
    return await axiosInstance.delete(`users/${id}`);
  },
  updateUser: async (
    id: string,
    name: string,
    phone: string,
    address: string,
    type: string
  ) => {
    return await axiosInstance.put(`users/${id}`, {
      name,
      phone,
      address,
      type,
    });
  },
};

export default UsersApi;

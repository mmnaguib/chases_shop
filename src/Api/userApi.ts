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
};

export default UsersApi;

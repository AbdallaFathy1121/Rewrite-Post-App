import axiosInstance from "../../../utils/axiosInstance";

export const getUserSubscriptionsByUserId = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/subscription/userSubscriptionByUserId/${userId}`);
      const result = response.data.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
};
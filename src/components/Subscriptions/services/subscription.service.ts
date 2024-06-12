import axiosInstance from '../../../utils/axiosInstance'

// Get All Subscriptions
export const getAllSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(`/subscription/all`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
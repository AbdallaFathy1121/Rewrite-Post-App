import axiosInstance from '../../../utils/axiosInstance'

// Get All Subscriptions
export const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/user/all');
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
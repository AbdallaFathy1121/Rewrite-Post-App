import axiosInstance from '../../../utils/axiosInstance';

// Get All Subscriptions
export const getAllUserSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(`/subscription/allUserSubscriptions`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  // Get All Subscriptions
export const updateUserSubscriptionById = async (id: any, status: any, days: any) => {
  try {
    const body = {
      "id": id,
      "status": status,
      "days": days
    };

    const response = await axiosInstance.post(`/subscription/update`, body);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
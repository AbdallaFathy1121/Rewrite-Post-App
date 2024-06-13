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

// Update User Subscription By Id 
export const updateUserSubscriptionById = async (id: number, status: string, days: number) => {
  try {
    const body = {
      "id": id,
      "status": status,
      "days": days
    };
    console.log(body);
    const response = await axiosInstance.post(`/subscription/update`, body);
    const result = response.data;
    console.log(response);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
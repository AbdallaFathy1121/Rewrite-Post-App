import axios from 'axios';
import config from '../../../config';

// Get All Subscriptions
export const getAllUserSubscriptions = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/subscription/allUserSubscriptions`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  // Get All Subscriptions
export const updateUserSubscriptionById = async (id, status, days) => {
  try {
    const body = {
      "id": id,
      "status": status,
      "days": days
    };

    const response = await axios.post(`${config.apiUrl}/subscription/update`, body);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
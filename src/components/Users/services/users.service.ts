import axios from 'axios';
import config from '../../../config';

// Get All Subscriptions
export const getAllSubscriptions = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/user/all`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
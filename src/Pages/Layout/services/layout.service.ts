import axios from 'axios';
import baseURL from '../../../Shared/baseUrl';

// Create User
export const getUserByToken = async (token: string) => {
  try {
    const response = await axios.get(`${baseURL}/user/token/${token}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

import axios from 'axios';
import baseURL from '../../../Shared/baseUrl';

// Create User
export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${baseURL}/user/${email}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

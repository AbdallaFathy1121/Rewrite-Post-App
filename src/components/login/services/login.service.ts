import axios from 'axios';
import baseURL from '../../../Shared/baseUrl';
import User from '../models/User';
import UserResponse from '../models/UserResponse';

// Create User
export const CreateUser = async (model: User) => {
  try {
    const response = await axios.post(`${baseURL}/user/add`, model);
    const result: UserResponse = response.data;
    localStorage.setItem("token", result.data.token);
  } catch (error) {
    console.error('Error:', error);
  }
}


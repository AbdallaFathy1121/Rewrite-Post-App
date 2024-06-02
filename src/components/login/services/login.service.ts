import axios from 'axios';
import baseURL from '../../../Shared/baseUrl';
import User from '../models/User';
import UserResponse from '../models/UserResponse';

// Create User
export const createUser = async (model: User) => {
  try {
    console.log(model);
    const response = await axios.post(`${baseURL}/user/add`, model);
    const result: UserResponse = response.data;
    localStorage.setItem("email", result.data.email);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get User By Email
export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${baseURL}/user/${email}`);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Assign User Into Free Subscription
export const assignUserIntoFreeSubscription = async (userId: string, subscriptionId = 1) => {
  try {
    const body = {
      "userId": userId,
      "subscriptionId": subscriptionId
    }
    const response = await axios.post(`${baseURL}/subscription/assignUserIntoSubscription`, body);
    const result = response.data;
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

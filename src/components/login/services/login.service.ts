import axios from 'axios';
import config from '../../../config';
import User from '../models/User';
import UserResponse from '../models/UserResponse';
import axiosInstance from '../../../utils/axiosInstance';

// Create User
export const createUser = async (model: User) => {
  try {
    const response = await axiosInstance.post(`/user/add`, model);
    const result: UserResponse = response.data;
    localStorage.setItem("email", result.data.email);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Login User by Email
export const auth = async (email: string) => {
  const model = {
    email: email
  }
  try {
    const response = await axiosInstance.post(`/user/login`, model);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}


// Get User By Email
export const getUserByEmail = async (email: string) => {
  try {
    const response = await axiosInstance.get(`/user/${email}`);
    const result = response.data;
    console.log(result);
    return result.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Assign User Into Free Subscription
export const assignUserIntoSubscription = async (userId: string, subscriptionId = 1, phoneNumber = null) => {
  try {
    const body = {
      "userId": userId,
      "subscriptionId": subscriptionId,
      "phoneNumber": phoneNumber
    }
    const response = await axiosInstance.post(`/subscription/assignUserIntoSubscription`, body);
    const result = response.data;
    console.log(result.data[0]);
    return result.data[0];
  } catch (error) {
    console.error('Error:', error);
  }
}

// Assign User Into Free Subscription
export const updateUserSubscriptionIdById = async (userId: string, userSubscriptionId) => {
  try {
    const body = {
      "id": userId,
      "userSubscriptionId": userSubscriptionId
    }
    const response = await axiosInstance.post(`/user/update`, body);
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

import Post from "../models/Post";
import PostResponse from "../models/PostResponse";
import UserSubscriptionResponse from "../models/UserSubscriptionResponse"
import axiosInstance from "../../../utils/axiosInstance";

// Create Post
export const createPost = async (model: Post) => {
  try {
    const response = await axiosInstance.post(`/post/add`, model);
    const result: PostResponse = response.data;
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUserSubscriptionById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/subscription/userSubscription/${id}`);
    const result: UserSubscriptionResponse = response.data;
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const changePostCreditsUserSubscriptionById = async (id: number, postCredits: number) => {
  try {
    const body = {
      id: id,
      postCredits: postCredits
    };
    const response = await axiosInstance.post(`/subscription/changePostCredits`, body);
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
};
interface UserSubscriptionResponse {
    isSuccess: boolean;
    errors: [];
    message: string;
    data: {
        id: number,
        userId: string,
        subscriptionId: number,
        postCredits: number,
        status: boolean,
        startDate: any,
        endDate: any,
        phoneNumber: string,
        days: number
    }
  }
  
  export default UserSubscriptionResponse;
  
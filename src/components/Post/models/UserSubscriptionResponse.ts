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
        phoneNumber: string
    }
  }
  
  export default UserSubscriptionResponse;
  
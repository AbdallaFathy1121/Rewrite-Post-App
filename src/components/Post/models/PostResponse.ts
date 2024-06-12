interface PostResponse {
  isSuccess: boolean;
  errors: [];
  message: string;
  data: {
    content: string;
  };
}

export default PostResponse;

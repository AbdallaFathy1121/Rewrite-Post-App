interface UserResponse {
    isSuccess: boolean,
    errors: [],
    message: string,
    data: {
        name: string,
        email: string,
        token: string,
        picture: string,
        roleId: number
    }
}

export default UserResponse;
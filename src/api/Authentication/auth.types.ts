export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    userId: number;
}

export type LogoutResponse = {
    message: string;
}

export type RegisterUserRequest = {
    email: string;
    password: string; 
    username: string;
}
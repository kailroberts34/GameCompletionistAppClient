export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        username?: string;
    }
}

export type LogoutResponse = {
    message: string;
}
import api from '../api-base';
import { type LoginRequest, type LoginResponse, type LogoutResponse } from './auth.types';
import { commonError, type ApiErrorResponse } from '../common.types';

export async function Login (request: LoginRequest): Promise<LoginResponse | ApiErrorResponse>{
    try {
        const response = await api.post<LoginResponse>('/auth/login', request);
        return response.data;

    } catch (error: any){
        console.error('Login error:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        return commonError('/auth/login', error.message);
    }
}

export async function Logout (): Promise<LogoutResponse | ApiErrorResponse>{

    try {

        const response = await api.post<LogoutResponse>('/auth/logout');
        return response.data;

    }catch (error: any){
        return commonError('/auth/logout', error?.message);
    }

}
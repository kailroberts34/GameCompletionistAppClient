import type { GameForUser, AddGameRequest } from './games.types';
import api from '../api-base';
import type { ApiErrorResponse } from '../common.types';
import { commonError } from '../common.types';

export async function GetGamesForUser(userId: number): Promise<GameForUser[] | ApiErrorResponse> {

    try {
        const response = await api.get<GameForUser[]>(`/games/user/${userId}`);
        return response.data;
    } catch (error: any){
            return commonError(`/games/user/${userId}`, error?.message);
        }
    
}

export async function AddGameForUser(request: AddGameRequest): Promise<GameForUser | ApiErrorResponse> {
    try {
        const response = await api.post<GameForUser>('/games', request);
        return response.data;
    } catch (error: any) {
        return commonError('/games', error?.message);
    }
}
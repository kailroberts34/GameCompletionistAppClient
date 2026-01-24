import type { GameForUser } from './games.types';
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
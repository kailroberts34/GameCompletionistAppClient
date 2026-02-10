import { useState, useCallback } from 'react';
import { DeleteGameForUser } from '../api/Games/games.api';
import type { DeleteGameForUserRequest } from '../api/Games/games.types';

export function useDeleteGame(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteGame = useCallback(async (request: DeleteGameForUserRequest) => {
        setLoading(true);
        setError(null);

        const response = await DeleteGameForUser(request);
        if ('error' in response && response.error) {
            setError(response.message);
        } else {
            setError('Unable to delete game')
        }
        setLoading(false);
    }, []);


    return { loading, error, deleteGame };
    
}
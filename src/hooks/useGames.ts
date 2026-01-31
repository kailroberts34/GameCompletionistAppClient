import { useState, useEffect, useCallback } from 'react';
import { GetGamesForUser } from '../api/Games/games.api';

export function useGames(userId: string) {
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGames = useCallback(async () => {
        if (!userId) {
            setError('User ID is missing');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const response = await GetGamesForUser(parseInt(userId));

        if ('error' in response && response.error) {
            setError(response.message);
        } else if (Array.isArray(response)) {
            setGames(response);
        } else {
            setError('Unexpected response format');
        }

        setLoading(false);
    }, [userId]);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);


    return { games, loading, error, refetch: fetchGames };
}
import { useState, useEffect } from 'react';
import { GetGamesForUser } from '../../api/Games/games.api';
import type { GameForUser } from '../../api/Games/games.types';

interface FetchGamesProps {
    userId: string;
}

export default function FetchGames({ userId }: FetchGamesProps) {
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            if (!userId) {
                setError('User ID is missing');
                setLoading(false);
                return;
            }

            console.log('Fetching games for user:', userId);
            const response = await GetGamesForUser(parseInt(userId));
            console.log('Response:', response);
            

            if ('error' in response && response.error) {
                setError(response.error);
                setLoading(false);
                return;
            }

            if (Array.isArray(response)) {
                console.log('Games received:', response.length);
                console.log('First game data:', JSON.stringify(response[0], null, 2));
                setGames(response);
            } else {
                setError('Unexpected response format');
            }
            
            setLoading(false);
        };

        fetchGames();
    }, [userId]);

    if (loading) {
        return <div className="loading">Loading games...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            {games.length === 0 ? (
                <p>No games found. Start adding games to your collection!</p>
            ) : (
                <div className="games-grid">
                    {games.map((game: any, index: number) => (
                        <div key={`${game.gameId || game.GameId}-${index}`} className="game-card">
                            <h3>{game.gameName || 'No Name'}</h3>
                            <p className="platform">{game.platformName || 'No Platform'}</p>
                            <p className="release-year">{game.releaseYear || 'Unknown Year'}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

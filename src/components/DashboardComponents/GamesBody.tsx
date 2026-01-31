import { useGames } from '../../hooks/useGames';

interface FetchGamesProps {
    userId: string;
    onRefetchReady?: (refetch: () => void) => void;
}

export default function GamesBody({ userId, onRefetchReady }: FetchGamesProps) {
    const { games, loading, error, refetch } = useGames(userId);
    
    if (onRefetchReady) {
        onRefetchReady(refetch);
    }
    
    if (loading) {
        return <p>Loading games...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
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

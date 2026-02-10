import { useDeleteGame } from "../../hooks/useDeleteGame";

export default function DeleteGameButton({ userId, gameId, onDeleteSuccess }: { userId: string; gameId: number; onDeleteSuccess: () => void }) {
    const { loading, error, deleteGame } = useDeleteGame();


    const handleDelete = async () => {
        await deleteGame({ userId: parseInt(userId), gameId });
        onDeleteSuccess();
    }


    return (

        <button onClick={handleDelete} disabled={loading} className="delete-button">
            {loading ? 'Deleting...' : 'x'}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </button>

    );

}
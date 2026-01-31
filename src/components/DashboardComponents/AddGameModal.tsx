import { useState } from "react";
import FormInput from "../LoginComponents/FormInput";
import type { AddGameRequest } from "../../api/Games/games.types";
import { AddGameForUser } from "../../api/Games/games.api";
import { useAuth } from "../../contexts/AuthContext";

interface AddGamesModalProps {
    isOpen: boolean;
    onClose: () => void;
    refetchGames: () => void;
}

export default function AddGameModal({ isOpen, onClose, refetchGames }: AddGamesModalProps) {
    const [gameName, setGameName] = useState("");
    const [platformName, setPlatformName] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const { userId } = useAuth();

    const handleAddGame = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userId) {
            return;
        }
        
        const newGameData: AddGameRequest = {
            userId: parseInt(userId),
            GameName: gameName,
            PlatformName: platformName,
            ReleaseYear: parseInt(releaseYear)
        };
        
        await AddGameForUser(newGameData);
        refetchGames();
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Game</h2>

                <form onSubmit={handleAddGame}>
                    <FormInput
                        id="gameName"
                        label="Game Name:"
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                    />

                    <FormInput
                        id="platformName"
                        label="Platform Name:"
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                    />

                    <FormInput
                        id="releaseYear"
                        label="Release Year:"
                        type="number"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                    />

                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )

    }
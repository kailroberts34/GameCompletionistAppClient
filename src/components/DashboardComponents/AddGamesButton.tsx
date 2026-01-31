import { useState } from "react";
import AddGameModal from "./AddGameModal";

interface AddGamesButtonProps {
    refetchGames: () => void;
}

export default function AddGamesButton({ refetchGames }: AddGamesButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePress = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <button className="add-games-button" onClick={handlePress}>
                Add New Game
            </button>
            {isModalOpen && (
                <AddGameModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    refetchGames={refetchGames}
                />
            )}
        </>
    );
}
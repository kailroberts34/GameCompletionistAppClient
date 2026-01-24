import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FetchGames from '../components/DashboardComponents/FetchGames';
import '../App.css';

export default function GamesDashboard() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Get userId from localStorage
        const id = localStorage.getItem('userId');
        
        if (id) {
            setUserId(id);
        } else {
            // No userId found, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    if (!userId) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <FetchGames userId={userId} />
        </div>
    );
}
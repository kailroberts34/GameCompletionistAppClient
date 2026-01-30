import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FetchGames from '../components/DashboardComponents/FetchGames';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/DashboardComponents/DashboardHeader';
import '../App.css';

export default function GamesDashboard() {
    const navigate = useNavigate();
    const { authLogout } = useAuth();
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

    const handleLogout = () => {
        authLogout();
        navigate('/login');
    };

    if (!userId) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <DashboardHeader />
            <div className="dashboard-header">
                <h1>My Games Collection</h1>
            </div>
            <FetchGames userId={userId} />
        </div>
    );
}
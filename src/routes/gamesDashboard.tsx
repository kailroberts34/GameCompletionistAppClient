import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import GamesBody from '../components/DashboardComponents/GamesBody';
import AddGamesButton from '../components/DashboardComponents/AddGamesButton';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/DashboardComponents/DashboardHeader';
import '../App.css';

export default function GamesDashboard() {
    const navigate = useNavigate();
    const { authLogout, userId } = useAuth();
    const refetchGamesRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);

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
            <GamesBody 
                userId={userId} 
                onRefetchReady={(refetch) => { refetchGamesRef.current = refetch; }}
            />
            <AddGamesButton 
                refetchGames={() => refetchGamesRef.current?.()} 
            />
        </div>
    );
}
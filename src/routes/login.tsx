import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from "../api/Authentication/auth.api";
import type { LoginRequest } from "../api/Authentication/auth.types";
import './login.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const request: LoginRequest = { email, password };
        const response = await Login(request);

        if ('error' in response) {
            setError(response.error);
            setLoading(false);
            return;
        }

        localStorage.setItem('token', response.token);
        setLoading(false);
        navigate('/games');
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )

}
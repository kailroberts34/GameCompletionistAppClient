import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from "../api/Authentication/auth.api";
import type { LoginRequest } from "../api/Authentication/auth.types";
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/LoginComponents/FormInput';
import Button from '../components/LoginComponents/Button';
import ErrorMessage from '../components/LoginComponents/ErrorMessage';
import '../App.css';
import logoPath from '../assets/GameCompletionistLogo.png';
import RegisterModal from '../components/LoginComponents/RegisterModal';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const { authLogin: authLogin } = useAuth();
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

        authLogin(response.token, response.userId.toString());
        setLoading(false);
        navigate(`/dashboard`);
    };

    return (
        <div className="login-container">
            <img src={logoPath} alt="Logo" className="logo" />
            <form onSubmit={handleSubmit} className="login-form">
                <FormInput
                    id="email"
                    label="Email:"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    id="password"
                    label="Password:"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <ErrorMessage message={error} />
                <Button type="submit" loading={loading}>
                    Login
                </Button>
                <Button onClick={() => setShowRegisterModal(true)}>
                    Register
                </Button>
            </form>
            <RegisterModal 
                isOpen={showRegisterModal} 
                onClose={() => setShowRegisterModal(false)} 
            />
        </div>
    );
}
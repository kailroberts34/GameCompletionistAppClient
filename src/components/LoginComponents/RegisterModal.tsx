import { useState } from 'react';
import { RegisterUser } from '../../api/Authentication/auth.api';
import type { RegisterUserRequest } from '../../api/Authentication/auth.types';
import FormInput from './FormInput';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const request: RegisterUserRequest = { email, password, username };
        const response = await RegisterUser(request);

        if ('error' in response) {
            setError(response.error);
            setLoading(false);
            return;
        }
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        setLoading(false);
        onClose();
        navigate(`/dashboard`);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        id="register-email"
                        label="Email:"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormInput
                        id="register-username"
                        label="Username:"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FormInput
                        id="register-password"
                        label="Password:"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FormInput
                        id="confirm-password"
                        label="Confirm Password:"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <ErrorMessage message={error} />
                    <div className="modal-buttons">
                        <Button type="submit" loading={loading}>
                            Register
                        </Button>
                        <Button type="button" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
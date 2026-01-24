interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ 
  type = 'button', 
  disabled = false, 
  loading = false, 
  children,
  onClick 
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className="submit-button"
      onClick={onClick}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
interface FormInputProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function FormInput({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  required = false 
}: FormInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  );
}
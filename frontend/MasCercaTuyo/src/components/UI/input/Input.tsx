import { forwardRef } from 'react';

interface InputProps {
  type?: React.HTMLInputTypeAttribute; // Ajustado para coincidir con los tipos válidos de `input`.
  placeholder?: string;
  name?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', placeholder, name, label, ...rest }, ref) => {
    return (
      <label className="form-control w-full p-2 gap-2">
        {label}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder || 'Default placeholder'}
          className="input input-bordered w-full"
          {...rest}
        />
      </label>
    );
  }
);

export default Input;

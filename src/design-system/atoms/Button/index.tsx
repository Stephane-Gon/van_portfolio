
interface ButtonProps {
  disabled?: boolean;
  mainColor?: string;
  label: JSX.Element | string | null;
  variant?: 'outline' | 'ghost';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  id?: string;
  name?: string;
}

/**
 * Primary UI component for user interaction
 */
const ButtonRoot = ({
  disabled = false,
  type = 'button',
  mainColor,
  variant,
  onClick,
  label,
  id,
  name,
  ...props
}: ButtonProps) => {

  
  return (
    <button
      id={id}
      name={name}
      type={type}
      color={mainColor}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}>
      {label}
    </button>
  );
};

export default ButtonRoot;

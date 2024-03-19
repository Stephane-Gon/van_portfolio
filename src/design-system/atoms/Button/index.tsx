import { Spinner } from "..";

interface ButtonProps {
  disabled?: boolean;
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
  loading = false,
  variant,
  onClick,
  label,
  id,
  name,
  ...props
}: ButtonProps) => {

  const _renderSpinner = () => { 
    return loading && <Spinner />;
  }

  const disabledStyle = disabled ? 'opacity-40 cursor-auto pointer-events-none' : '';
  const loadingStyle = loading ? 'cursor-auto pointer-events-none' : '';

  return (
    <span className={`bg-gradient-to-r from-primaryPink via-primaryGreen to-primaryBlue transition-all flex items-center justify-center rounded-sm myBtn relative p-border hover:scale-105 ${disabledStyle} ${loadingStyle}`}>
      <button
        id={id}
        name={name}
        type={type}
        disabled={disabled || loading}
        onClick={!disabled ? onClick : undefined}
        {...props}
        className="py-1 px-9 bg-smothDark text-smothWhite rounded-sm border-none font-semibold w-full flex items-center justify-center gap-1"
      >
        {_renderSpinner()}
        {label}
      </button>
    </span>
  );
};

export default ButtonRoot;

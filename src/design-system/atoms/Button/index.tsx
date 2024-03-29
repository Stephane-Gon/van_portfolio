import { Spinner } from '..';

interface ButtonProps {
  disabled?: boolean;
  label: JSX.Element | string | null;
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
  onClick,
  label,
  id,
  name,
  ...props
}: ButtonProps) => {
  const _renderSpinner = () => {
    return loading && <Spinner />;
  };

  const disabledStyle = disabled ? 'opacity-40 cursor-auto pointer-events-none' : '';
  const loadingStyle = loading ? 'cursor-auto pointer-events-none' : '';

  return (
    <span
      className={`myBtn relative flex items-center justify-center rounded-sm bg-gradient-to-r from-secondary via-tertiary to-primary p-border transition-all hover:scale-105 ${disabledStyle} ${loadingStyle}`}>
      <button
        id={id}
        name={name}
        type={type}
        disabled={disabled || loading}
        onClick={!disabled ? onClick : undefined}
        {...props}
        className='flex w-full items-center justify-center gap-1 rounded-sm border-none bg-accent px-9 py-1 font-semibold text-text'>
        {_renderSpinner()}
        {label}
      </button>
    </span>
  );
};

export default ButtonRoot;

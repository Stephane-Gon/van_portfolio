import { Spinner, Gradient } from '..';

interface ButtonProps {
  disabled?: boolean;
  label: JSX.Element | string | null;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  id?: string;
  name?: string;
  iconLeft?: boolean;
  icon?: JSX.Element;
  variant?: 'gradient' | 'danger';
}

/**
 * Primary UI component for user interaction
 */
const ButtonRoot = ({
  disabled = false,
  type = 'button',
  loading = false,
  iconLeft = false,
  variant = 'gradient',
  onClick,
  label,
  id,
  name,
  icon,
  ...props
}: ButtonProps) => {
  const _renderSpinner = () => {
    return loading && <Spinner />;
  };

  const disabledStyle = disabled ? 'opacity-40 cursor-auto pointer-events-none' : '';
  const loadingStyle = loading ? 'cursor-auto pointer-events-none' : '';

  const _renderButton = () => {
    return (
      <button
        id={id}
        name={name}
        type={type}
        disabled={disabled || loading}
        onClick={!disabled ? onClick : undefined}
        {...props}
        className='flex w-full items-center justify-center gap-1 rounded-sm border-none bg-accent px-9 py-1 font-semibold text-text'>
        {_renderSpinner()}
        {iconLeft && icon}
        {label}
        {!iconLeft && icon}
      </button>
    );
  };

  const _renderVariant = () => {
    switch (variant) {
      case 'danger':
        return (
          <div
            className={`myBtn relative flex items-center justify-center gap-2 rounded-sm bg-dangerRed p-border transition-all hover:scale-105 ${disabledStyle} ${loadingStyle}`}>
            {_renderButton()}
          </div>
        );
      case 'gradient':
      default:
        return (
          <Gradient
            extraClasses={`myBtn relative flex items-center justify-center gap-2 rounded-sm p-border transition-all hover:scale-105 ${disabledStyle} ${loadingStyle}`}>
            {_renderButton()}
          </Gradient>
        );
    }
  };

  return _renderVariant();
};

export default ButtonRoot;


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

  // TODO - Definir uma cor primária e outra secundária que combine bem com este dark, tipo um roza ou um azul
  // TODO - Depois com essas cores criar um BG atras deste btn para dár efeito de border neon;
  return (
    <button
      id={id}
      name={name}
      type={type}
      color={mainColor}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
      className="py-1.5 px-9 bg-gradient-to-b from-smothDark from-20% to-smothDark200 text-smothWhite rounded-sm border-none font-semibold"
    >
      {label}
    </button>
  );
};

export default ButtonRoot;

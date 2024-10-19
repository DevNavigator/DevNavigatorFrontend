import { button } from 'framer-motion/client';

interface IButton {
  children: React.ReactNode;
  className?: string;
  variant?: 'secondary' | 'primary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  className = '',
  variant = 'secondary',
  type = 'button',
  onClick,
  href = '',
  disabled = false,
}: IButton) => {
  const commonClasses = `p-2 px-5 rounded-3xl border border-trasparent bg-${variant} ${className} text-primary transition-all hover:bg-primary hover:text-secondary hover:border-secondary hover:border hover:scale-110 active:scale-95`;

  // Renderiza un <a> si href está presente, de lo contrario, un <button>
  return href ? (
    <a
      href={href}
      className={commonClasses}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={commonClasses}
    >
      {children}
    </button>
  );
};

export default Button;

// interface IButton {
//   children: React.ReactNode;
//   className?: string;
//   variant?: 'secondary' | 'primary';
//   type?: 'button' | 'submit' | 'reset' | 'reset';
//   onClick?: () => void;
//   href?: string;

// }

// const Button = ({
//   children,
//   className ,
//   variant = 'secondary',
//   onClick,
//   href,
// }: IButton) => {
//   return (
//     <button
//       className={`p-2  px-5 rounded-3xl bg-secondary ${className} text-primary transition-all hover:bg-primary hover:text-secondary  hover:border-secondary hover:border  hover:scale-110 active:scale-95
//       `}

//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

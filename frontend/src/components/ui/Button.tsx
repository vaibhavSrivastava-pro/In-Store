import { Link } from 'react-router-dom';

interface ButtonProps {
    value: string;
    link?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ value, link, onClick, disabled }) => {
    const buttonContent = (
        <button
            className={`inline-flex h-12 w-full animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-semibold text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {value}
        </button>
    );

    return link ? <Link to={link}>{buttonContent}</Link> : buttonContent;
};

export default Button;

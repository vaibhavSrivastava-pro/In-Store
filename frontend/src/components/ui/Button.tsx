import { Link } from 'react-router-dom';


const Button = ({ value, link }: { value: string, link: string }) => {
    return (
        <Link to={link}>
            <button className="inline-flex h-12 w-full animate-shimmer items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-8 font-semibold text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                {value}
            </button>
        </Link>
    );
};


export default Button;
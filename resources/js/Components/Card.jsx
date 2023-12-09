export default function Card({ children, color, rounded, padding }) {
    return (
        <div
            className={`${color === undefined ? "bg-white" : color} ${rounded && rounded} ${padding && padding}`}
        >
            {children}
        </div>
    );
}

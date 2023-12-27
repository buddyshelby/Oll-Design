export default function Card({ children, color, rounded, padding }) {
    return (
        <div
            className={`${color === undefined ? "bg-[#f0f0f0]" : color} ${rounded && rounded} ${padding && padding}`}
        >
            {children}
        </div>
    );
}

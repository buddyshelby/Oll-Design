export default function Card({ children, color, rounded, padding }) {
    console.log(color, "card");
    return (
        <div
            className={`${color === undefined ? "bg-white" : color} ${rounded && rounded} ${padding && padding}`}
        >
            {children}
        </div>
    );
}

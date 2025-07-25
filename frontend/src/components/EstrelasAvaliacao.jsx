import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function EstrelasAvaliacao({ nota }) {
    if (!nota) return null;
    
    const nota10 = parseFloat(nota);
    const nota5 = Math.round((nota10 / 10) * 10) / 2;
    const estrelas = [];

    for (let i = 1; i <= 5; i++) {
        if (nota5 >= i) {
            estrelas.push(<FaStar key={i} className="text-yellow-500" />);
        } else if (nota5 >= i - 0.5) {
            estrelas.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        } else {
            estrelas.push(<FaRegStar key={i} className="text-yellow-500" />);
        }
    }

    return (
        <div className="flex gap-1">{estrelas}</div>
    )
};

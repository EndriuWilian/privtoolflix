import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import EstrelasAvaliacao from "./EstrelasAvaliacao"

export default function ItemCardSimples({ poster, titulo, nota, onClick, ano }) {
    const [imgSrc, setImgSrc] = useState(poster);

    const handleErrorImagem = () => {
        setImgSrc("/public/not_found.png");
    };

    return (
    <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow p-2 cursor-pointer hover:shadow-xl transition-all duration-500 min-w-[220px] max-w-[220px] max-h-[320px] min-h-[323px] flex flex-col"
        onClick={onClick}
    >
        <img
            src={imgSrc}
            alt={titulo}
            className="w-[220px] h-[240px] object-cover rounded-md"
            onError={handleErrorImagem}
        />
        <h2 className="text-sm font-semibold mt-2 line-clamp-2 break-words">{titulo}</h2>
        <div className="flex justify-between items-center mt-auto w-full">
            <EstrelasAvaliacao nota={nota}/>
            <span className="text-sm text-gray-600 dark:text-gray-100">{ano}</span>
        </div>
    </div>
    );
}

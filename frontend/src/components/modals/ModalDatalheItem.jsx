import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import EstrelasAvaliacao from "../EstrelasAvaliacao"

import buscarTemporada from "../../services/buscarTemporada";
import Buscando from "../Buscando";

export default function ModalDetalhaItem({ filme, onClose }) {
    const [visivel, setVisivel] = useState(false);
    const [favorito, setFavorito] = useState(false);
    const [temporada, setTemporada] = useState(1);
    const [dadosTemporada, setDadosTemporada] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const [imgSrc, setImgSrc] = useState(filme.poster)
    const handleErrorImagem = () => {
        setImgSrc("/public/not_found.png");
    };

    useEffect(() => {
        const carregarEpisodios = async () => {
            if (filme.tipo !== "series") return;

            setCarregando(true);
            try {
                const res = await buscarTemporada(filme.imdbId, temporada);
                if (res.sucesso) {
                    setDadosTemporada(res.dados);
                } else {
                    setDadosTemporada(null);
                }
            } catch (erro) {
                console.error("Erro ao buscar temporada:", erro);
                setDadosTemporada(null);
            }
            setCarregando(false);
        };

        carregarEpisodios();
    }, [filme.imdbId, temporada]);


    useEffect(() => {
        setTimeout(() => setVisivel(true), 10);

        const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos") || "[]");
        setFavorito(favoritosSalvos.includes(filme.imdbId));
    }, [filme.imdbId]);

    const fecharModal = () => {
        setVisivel(false);
        setTimeout(onClose, 300);
    };

    const alternarFavorito = () => {
        const favoritosAtuais = JSON.parse(localStorage.getItem("favoritos") || "[]");
        let atualizados;

        if (favorito) {
            atualizados = favoritosAtuais.filter(id => id !== filme.imdbId);
        } else {
            atualizados = [...favoritosAtuais, filme.imdbId];
        }

        localStorage.setItem("favoritos", JSON.stringify(atualizados));
        setFavorito(!favorito);
    };

    return (
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
                    visivel ? "backdrop-blur-sm bg-white/30 opacity-100" : "opacity-0"
                }`}
                onClick={fecharModal}
            >
                <div
                    className={`bg-white dark:bg-primary-dark p-6 pb-2 rounded max-w-3xl w-full relative transform transition duration-300 ${
                        visivel ? "scale-100" : "scale-95"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={fecharModal}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
                        title="Fechar"
                    >
                        ✖
                    </button>

                    <div className={`flex gap-6 ${filme.tipo != "series" ? "pb-4" : ""}`}>
                        {/* Poster */}
                        <div className="w-40 flex-shrink-0">
                            <img
                                src={imgSrc}
                                alt={filme.titulo}
                                className="w-full h-auto rounded"
                                onError={handleErrorImagem}
                            />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold mb-2">{filme.titulo}</h2>
                            <p className="text-sm mb-2">
                                <strong>Tipo:</strong>{" "}
                                {(filme.tipo == "movie" ? "Filme" : "Série")}
                            </p>
                            
                            {<EstrelasAvaliacao nota={filme.ratings?.[0]?.nota}/> ?? "Sem nota disponível"}
                            
                            <p className="pt-4 text-gray-700 dark:text-gray-300">{filme.sinopse}</p>

                            <div className="mt-auto flex justify-end">
                                <button
                                    onClick={alternarFavorito}
                                    className={`mt-4 px-4 py-2 rounded transition ${
                                        favorito
                                            ? "bg-red-600 hover:bg-red-700 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    {favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {filme.tipo === "series" && (
                    <div className="dark:text-white pt-1 mt-3 border-t-2 border-secondary dark:border-blue-950">
                        <h2 className="text-xl font-bold font-sans mb-3 mt-1">Episódios</h2>

                        {carregando ? (
                            <Buscando terciary={true}/>
                        ) : (
                        <>
                            <ul className="grid gap-2 max-h-64 w-full overflow-y-auto mb-4">
                            {dadosTemporada?.episodes?.map((ep) => (
                                <li
                                key={ep.imdbID}
                                className="bg-secondary dark:bg-blue-950 px-3 py-2 rounded text-white font-mono text-sm flex justify-between items-center"
                                >
                                <div>
                                    <strong>{ep.title}</strong> <span className="text-xs text-gray-400 ml-2">E{ep.episode.padStart(2, "0")}</span>
                                </div>
                                <span className="text-gray-300 text-xs text-right min-w-[100px]">
                                    ({ep.released}) - ⭐ {ep.imdbRating}
                                </span>
                                </li>
                            ))}
                            </ul>

                            <div className="flex justify-between items-center pl-2 pr-2 pb-2">
                                <button
                                    onClick={() => setTemporada((prev) => Math.max(1, prev - 1))}
                                    className=""
                                    disabled={temporada <= 1}
                                >
                                    <BsArrowLeftCircleFill size={36}/>
                                </button>
                                <span className="font-bold">Temporada {temporada}</span>
                                <button
                                    onClick={() => setTemporada((prev) => prev + 1)}
                                    className=""
                                    disabled={
                                    dadosTemporada &&
                                    parseInt(temporada) >= parseInt(dadosTemporada.totalSeasons)
                                    }
                                >
                                    <BsArrowRightCircleFill size={36}/>
                                </button>
                            </div>
                        </>
                        )}
                    </div>
                    )}

                </div>
            </div>

    );
}

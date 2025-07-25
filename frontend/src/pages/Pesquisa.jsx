import { useState } from "react";
import { IoSend } from "react-icons/io5";
import ResultadosPesquisa from "../components/ResultadosPesquisa";
import ModalDetalhaItem from "../components/modals/ModalDatalheItem";
import buscarItem from "../services/buscarItem";

export default function Pesquisa() {
  const currentYear = new Date().getFullYear();
  const anos = [];
  for (let ano = currentYear; ano >= 1888; ano--) {
    anos.push(ano);
  }

  const [termo, setTermo] = useState("");
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [pesquisar, setPesquisar] = useState(false);
  const [parametrosBusca, setParametrosBusca] = useState(null);

  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [filmeDetalhado, setFilmeDetalhado] = useState(null);

  const handleSubmit = () => {
    if (termo.trim() !== "") {
      setParametrosBusca({ termo, tipo, ano });
      setPesquisar(true);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleItemClick = async (item) => {
    setFilmeSelecionado(item);

    try {
      const detalhe = await buscarItem(item.imdbId);
      setFilmeDetalhado(detalhe);
    } catch (erro) {
      console.error("Erro ao buscar detalhes do item:", erro);
    }
  };

  return (
    <div className="w-full">
      <div className="flex p-4 shadow-md bg-primary dark:bg-primary-dark transition-colors duration-500">
        <div className="max-w-6xl mx-auto flex items-center w-full gap-3">
          <input
            type="text"
            placeholder="Pesquise por filmes ou séries e desfrute também dos filtros ao lado"
            className="flex-grow px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950 dark:text-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-500"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="p-2 pl-3 pr-3 rounded-lg bg-primary dark:bg-primary-dark text-gray-700 dark:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-500"
            title="Pesquisar"
            onClick={handleSubmit}
          >
            <IoSend className="w-5 h-5" />
          </button>

          <select
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="" disabled>Tipo</option>
            <option value="">Todos</option>
            <option value="movie">Filmes</option>
            <option value="series">Séries</option>
          </select>

          <select
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          >
            <option value="" disabled>Ano</option>
            <option value="">Todos</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
      </div>

      {pesquisar && parametrosBusca && (
        <ResultadosPesquisa
          termo={parametrosBusca.termo}
          tipo={parametrosBusca.tipo}
          ano={parametrosBusca.ano}
          onClick={handleItemClick}
        />
      )}

      {filmeDetalhado && (
        <ModalDetalhaItem
          filme={filmeDetalhado.dados}
          onClose={() => {
            setFilmeDetalhado(null);
            setFilmeSelecionado(null);
          }}
        />
      )}
    </div>
  );
}

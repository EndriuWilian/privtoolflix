import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import buscarListaService from "../services/buscarListaService";
import ItemCardSimples from "./ItemCardSimples"; 
import Buscando from "./Buscando";

export default function ResultadosPesquisa({ termo, tipo, ano, onClick }) {
  const [pagina, setPagina] = useState(1);
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [totalResultados, setTotalResultados] = useState(0);

  useEffect(() => {
    const buscar = async () => {
      setCarregando(true);
      setErro(null);

      try {
        const resposta = await buscarListaService(termo, tipo, ano, pagina);
        const dados = resposta?.dados;

        if (dados?.response === "True") {
          setResultado(dados.search || []);
          setTotalResultados(parseInt(dados.totalResults || "0"));
        } else {
          setResultado([]);
          setTotalResultados(0);
        }
      } catch (err) {
        setErro("Erro ao buscar resultados");
      } finally {
        setCarregando(false);
      }
    };

    buscar();
  }, [termo, tipo, ano, pagina]);

  const podeAvancar = pagina * 10 < totalResultados;

  return (
    <div className="p-3 mt-8 bg-tertiary dark:bg-tertiary-dark text-gray-800 dark:text-gray-100 rounded shadow w-300 max-h-205 mx-auto transition-all duration-500">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Resultados para: <span className="italic">{termo}</span>
      </h2>

      {carregando && (<Buscando terciary={true}/>)}
      {erro && <p className="text-red-500 m-10 pb-8 text-center">{erro}</p>}

      {!carregando && resultado.length === 0 && (
        <p className="text-white dark:text-gray-500 m-10 pb-8 text-center">Nenhum resultado encontrado</p>
      )}

      {!carregando && resultado.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {resultado.map((item, index) => (
              <ItemCardSimples
                key={item.imdbId}
                poster={item.poster !== "N/A" ? item.poster : "/poster-nao-disponivel.jpg"}
                titulo={item.titulo}
                nota={null}
                onClick={() => onClick(item)}
                ano={item.ano}
              />
            ))}
          </div>

          <h1 className="text-sm font-medium text-center pt-4">Página {pagina}</h1>
          <div className="flex justify-between items-center pb-1">
            {pagina > 1 ? (
              <button
                onClick={() => setPagina((prev) => prev - 1)}
                className="px-3 py-2 mb-1"
              >
                <BsArrowLeftCircleFill size={36}/>
              </button>
            ) : <div />}

            {podeAvancar ? (
              <button
                onClick={() => setPagina((prev) => prev + 1)}
                className="px-3 py-1"
              >
                <BsArrowRightCircleFill size={36}/>
              </button>
            ) : <div />}
          </div>
        </>
      )}
    </div>
  );
}

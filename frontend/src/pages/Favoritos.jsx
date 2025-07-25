import { useEffect, useState } from "react";
import { buscarItensLista } from "../services/buscarItensListaService";
import ListaItensCardsHorizontal from "../components/ListaItensCardsHorizontal";
import ModalDetalhaItem from "../components/modals/ModalDatalheItem";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosSalvos);

    if (favoritosSalvos.length > 0) {
      buscarItensLista(favoritosSalvos)
        .then(setFilmes)
        .catch((erro) => console.error("Erro ao buscar favoritos:", erro));
    }
  }, []);

  return (
    <div className="p-4">
      {filmes.length > 0 ? (
        <ListaItensCardsHorizontal
          itens={filmes}
          titulo="Lista de favoritos"
          onClick={(item) => setSelecionado(item.dados)}
        />
      ) : (
        <p className="text-gray-500">Nenhum favorito salvo.</p>
      )}

      {selecionado && (
        <ModalDetalhaItem
          filme={selecionado}
          onClose={() => setSelecionado(null)}
        />
      )}
    </div>
  );
}

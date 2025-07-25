import { useEffect, useState } from "react";
import { buscarItensLista } from "../services/buscarItensListaService";
//import { buscarTemporada } from "../services/buscarTemporada";
import ItemCardSimples from "../components/ItemCardSimples";
import ModalDetalhaItem from "../components/modals/ModalDatalheItem";
import Carrossel from "../components/Carrossel"
import Buscando from "../components/Buscando";
import ListaItensCardsHorizontal from "../components/ListaItensCardsHorizontal";
import { montarDadosCarrossel } from "../services/montarDadosCarrossel";

{/*################ TRECHO MANUAL (LEIA) ################*/}
{/*
  
  Neste trecho do início, utilizei uma lista de imdbs fixo para apresentação.
  Isso devido a API do OMBd não possuir uma consulta para os "Em alta" ou "Em alta para determinado gênero ou tipo".

  Também, para a parte do carrossel do topo, utilzei imagens fixas da internet para os filmes indicados, devido
  a qualidade da imagem do OMDb ficar péssima quando muito grande, pela baixa qualidade.

  Essas ações não ocorreriam em um ambiente de produção, utilizando um serviço que entregaria esses endpoints/metodos.

  O que está fixo é apenas o ID IMDB, os dados estão sendo buscados da API.

*/}
{/*################ TRECHO MANUAL (LEIA) ################*/}

const dadosCarrossel = [
  [
    "tt2015381",
    "https://i.pinimg.com/originals/49/da/7d/49da7d8efab607e46a080cc5356509ea.jpg"
  ],[
    "tt0816692",
    "https://wallpaperaccess.com/full/37952.jpg"
  ],[
    "tt4154756",
    "https://www.10wallpaper.com/wallpaper/3840x2160/1804/2018_Avengers_Infinity_War_4K_Film_3840x2160.jpg"
  ],[
    "tt4881806",
    "https://www.10wallpaper.com/wallpaper/3840x2160/1805/2018_Jurassic_World_Fallen_Kingdom_Films_4K_HD_3840x2160.jpg"
  ]
];

const comediasImdbs = [
  "tt0107048",
  "tt0109830",
  "tt0088763",
  "tt0110912",
  "tt0364725",
  "tt0110916",
  "tt0120888",
  "tt0109686",
  "tt0126029",
  "tt0102926",
  "tt0086250",
  "tt1375666",
  "tt0118715",
  "tt0118715" 
];

const familiaImdbs = [
  "tt0110357",
  "tt0317705",
  "tt0266543",
  "tt0382932",
  "tt0114709",
  "tt2293640",
  "tt0441773",
  "tt0120915",
  "tt0266543",
  "tt0892769",
  "tt0389790",
  "tt0435761" 
]

const terrorImdbs = [
  "tt0078748",
  "tt0081505",
  "tt1457767",
  "tt0074285",
  "tt0185937",
  "tt0085407",
  "tt0102926",
  "tt0365748",
  "tt1179933",
  "tt6857112" 
]

const acaoImdbs = [
  "tt0848228",
  "tt4154796",
  "tt0110413",
  "tt2911666",
  "tt0133093",
  "tt0468569",
  "tt1877830",
  "tt2488496",
  "tt0120815",
  "tt1270797",
  "tt1049413",
  "tt1631867" 
]

const seriesImdbs = [
  "tt0944947",
  "tt0903747",
  "tt4574334",
  "tt2861424",
  "tt1475582",
  "tt7366338",
  "tt0060028",
  "tt0306414",
  "tt2395695",
  "tt0141842",
  "tt0472954",
  "tt0898266",
  "tt0108778",
  "tt0411008",
  "tt2861424",
  "tt1442449",
  "tt1520211",
  "tt2071645" 
]

{/*############ FIM TRECHO MANUAL (LEIA) #############*/}
{/*########### Leia no início a descrição ############*/}
{/*############ FIM TRECHO MANUAL (LEIA) #############*/}

function Principal() {

  const [filmesPorCategoria, setFilmesPorCategoria] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [dadosCarrosselProcessado, setDadosCarrosselProcessado] = useState([]);

  useEffect(() => {
    const carregarCarrossel = async () => {
      try {
        const dados = await montarDadosCarrossel(dadosCarrossel);
        setDadosCarrosselProcessado(dados);
      } catch (erro) {
        console.error("Erro ao carregar carrossel:", erro);
      }
    };

    carregarCarrossel();
  }, []);

  const categorias = {
    familia: familiaImdbs,
    series: seriesImdbs,
    comedia: comediasImdbs,
    terror: terrorImdbs,
    acao: acaoImdbs
  };

  const descricaoCategorias = {
    comedia: "Comédia",
    series: "Séries",
    familia: "Para a família",
    terror: "Terror",
    acao: "Ação"
  }

  useEffect(() => {
    const buscarTodos = async () => {
      const resultados = {};

      for (const [categoria, lista] of Object.entries(categorias)) {
        try {
          const itens = await buscarItensLista(lista);
          resultados[categoria] = itens;
        } catch (erro) {
          console.error(`Erro ao buscar itens da categoria ${categoria}:`, erro);
          resultados[categoria] = [];
        }
      }

      setFilmesPorCategoria(resultados);
      setCarregando(false);
    };

    buscarTodos();
  }, []);


  if (carregando) {
    return Buscando(false);
  }

  return (
    <div>
      <Carrossel itens={dadosCarrosselProcessado} />

      <div className="p-4 w-full">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Preparamos para você estilos de filmes e séries que você irá amar. Clique nos itens abaixo e obtenha mais informações.
        </p>

        {Object.entries(filmesPorCategoria).map(([categoria, itens]) => (
          <ListaItensCardsHorizontal
            key={categoria}
            itens={itens}
            titulo={`${descricaoCategorias[categoria]}`}
            onClick={(item) => setFilmeSelecionado(item.dados)}
          />
        ))}

      </div>

      {filmeSelecionado && (
        <ModalDetalhaItem
          filme={filmeSelecionado}
          onClose={() => setFilmeSelecionado(null)}
        />
      )}
    </div>

  );
}

export default Principal;

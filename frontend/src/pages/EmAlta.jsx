import { useEffect, useState } from "react";
import { buscarItensLista } from "../services/buscarItensListaService";
import { FaFire } from "react-icons/fa6";
import ItemCardSimples from "../components/ItemCardSimples";
import ModalDetalhaItem from "../components/modals/ModalDatalheItem";
import Buscando from "../components/Buscando";

export default function EmAlta() {

{/*################ TRECHO MANUAL (LEIA) ################*/}
{/*
  
  Neste trecho do início, utilizei uma lista de imdbs fixo para apresentação.
  Isso devido a API do OMBd não possuir uma consulta para os "Em alta" ou "Em alta para determinado gênero ou tipo".

  Essas ações não ocorreriam em um ambiente de produção, utilizando um serviço que entregaria esses endpoints/metodos.

  O que está fixo é apenas o ID IMDB, os dados estão sendo buscados da API, com cache do back-end aplicado.

*/}
{/*################ TRECHO MANUAL (LEIA) ################*/}

  const imdbListaEmAlta = [
    "tt4154796", 
    "tt1856101", 
    "tt7366338", 
    "tt2071645", 
    "tt1375666", 
    "tt6751668", 
    "tt0848228", 
    "tt1745960", 
    "tt6856242", 
    "tt1285016", 
    "tt7242142", 
    "tt9419884", 
    "tt10048342",
    "tt9253284", 
    "tt2382320", 
    "tt0944947", 
    "tt0903747", 
    "tt0944947", 
    "tt2861424", 
    "tt4574334", 
    "tt3581920", 
    "tt2395695", 
    "tt13443470",
    "tt10954600",
    "tt0108778", 
    "tt0411008", 
    "tt0141842", 
    "tt0472954", 
    "tt0898266", 
    "tt2861424", 
    "tt1520211", 
    "tt0110912", 
    "tt1631867", 
    "tt1877830", 
    "tt2911666", 
    "tt0133093", 
    "tt0458339", 
  ];

{/*############ FIM TRECHO MANUAL (LEIA) #############*/}
{/*########### Leia no início a descrição ############*/}
{/*############ FIM TRECHO MANUAL (LEIA) #############*/}

  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  useEffect(() => {
    async function buscarItem() {
      try {
        const resultados = await buscarItensLista(imdbListaEmAlta);
        setFilmes(resultados);
      } catch (erro) {
        console.error("Erro ao buscar itens:", erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarItem();
  }, []);

  if (carregando) {
    return Buscando(false);
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{`Filmes e séries em alta`}</h1>
      <hr className="border-t-5 border-secondary dark:border-secondary-dark shadow-md mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {filmes.map((filme, index) => (
          <ItemCardSimples
            key={index}
            poster={filme.dados.poster}
            titulo={filme.dados.titulo}
            nota={filme.dados.ratings[0]?.nota}
            onClick={() => setFilmeSelecionado(filme.dados)}
            ano={filme.dados.ano}
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

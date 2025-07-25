import buscarItem from "./buscarItem";

export async function montarDadosCarrossel(dadosCarrossel) {
  const resultados = [];

  for (const [imdbId, imagem] of dadosCarrossel) {
    try {
      const item = await buscarItem(imdbId);
      const titulo = item.dados.titulo || "Sem título";
      const sinopse = item.dados.sinopse || "Sem sinopse disponível";

      resultados.push([titulo, sinopse, imagem]);
    } catch (erro) {
      console.error(`Erro ao processar ${imdbId}:`, erro);
      resultados.push(["Erro ao carregar", "Tente novamente mais tarde", imagem]);
    }
  }

  return resultados;
}

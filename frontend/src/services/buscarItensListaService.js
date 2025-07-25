
export async function buscarItensLista(imdbIds = []) {
  //const url = `${process.env.REACT_APP_BACKEND_URL}/buscarItem`;
  const url = "/api/buscarItem";
  try {
    const requisicoes = imdbIds.map(async (imdbId) => {
      const resposta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ imdbId })
      });

      if (!resposta.ok) throw new Error(`Erro ao buscar ${imdbId}`);

      return await resposta.json();
    });

    const resultados = await Promise.all(requisicoes);
    return resultados;
  } catch (erro) {
    console.error("Erro geral ao buscar itens:", erro);
    throw erro;
  }
}

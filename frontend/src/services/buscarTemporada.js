
export default async function buscarTemporada(imdbId, temporada) {
  //const url = `${process.env.REACT_APP_BACKEND_URL}/buscarTemporada`;
  const url = "/api/buscarTemporada";
  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imdbId, temporada })
    });

    if (!resposta.ok) throw new Error(`Erro ao buscar ${imdbId} e temporada ${temporada}`);

    return await resposta.json();
  } catch (erro) {
    console.error("Erro geral ao buscar temporada:", erro);
    throw erro;
  }
}

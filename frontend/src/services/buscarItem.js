
export default async function buscarItem(imdbId) {
  const fullSinopse = true;
  //const url = `${process.env.REACT_APP_BACKEND_URL}/buscarItem`;
  const url = "/api/buscarItem";
  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ imdbId, fullSinopse })
    });

    if (!resposta.ok) throw new Error(`Erro ao buscar ${imdbId}`);

    return await resposta.json();
  } catch (erro) {
    console.error("Erro geral ao buscar itens:", erro);
    throw erro;
  }
}

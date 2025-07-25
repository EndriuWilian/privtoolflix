
export default async function buscarListaService(texto, tipo, ano, pagina) {
  //const url = `${process.env.REACT_APP_BACKEND_URL}/buscarLista`;
  const url = "/api/buscarLista";
  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto, tipo, ano, pagina })
    });

    if (!resposta.ok) throw new Error(`Erro ao buscar ${imdbId}`);

    return await resposta.json();
  } catch (erro) {
    console.error("Erro geral ao buscar itens:", erro);
    throw erro;
  }
}

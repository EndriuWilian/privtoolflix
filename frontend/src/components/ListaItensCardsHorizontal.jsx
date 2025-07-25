import ItemCardSimples from "../components/ItemCardSimples";

export default function ListaItensCardsHorizontal({ itens, titulo, onClick}) {
    console.log(itens);
  return (
    <div className="w-full mb-6">
      <h1 className="text-2xl mb-3 font-bold">{titulo}</h1>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hover">
        {itens.map((item, index) => (
          <ItemCardSimples
            key={index}
            poster={item.dados.poster}
            titulo={item.dados.titulo}
            nota={item.dados.ratings?.[0]?.nota}
            onClick={() => onClick(item)}
            ano={item.dados.ano}
          />
        ))}
      </div>
    </div>
  );
}

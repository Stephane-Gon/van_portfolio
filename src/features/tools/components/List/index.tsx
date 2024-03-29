type ListProps = {
  tools: any[] | null;
};

const List = ({ tools }: ListProps) => {
  console.log(tools);
  // TODO - Criar um skeleton loader, e uma mensagem de erro caso não tenha tools
  // TODO - Criar os types das tools e na config do typescript proibir any

  return <div>List</div>;
};

export default List;

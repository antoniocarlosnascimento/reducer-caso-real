import { ChangeEvent, ElementType, useState } from "react";
import { usePeopleList } from "./reducers/peopleList";

const App = () => {

  const [listPeople, actions] = usePeopleList();
  const [personInputName, setPersonInputName] = useState('');

  const handleInputPersonInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonInputName( e.target.value )
  }

  const handleAddPerson = () => {
    if(personInputName) {
      actions({ type: "ADD", payload: { name: personInputName } });
      setPersonInputName('');
    }
  }

  const deletePerson = (id: string) => {
      actions({
        type: 'DEL', payload: { id }
      })
  }

  const handleOrderList = () => {
    actions({ type: "ORDER" });
  }

  return (
    <div>
      <input type="text" value={personInputName} onChange={handleInputPersonInputName} />
      <button onClick={handleAddPerson}>Adicionar</button>

      <hr />
      <button onClick={handleOrderList}>Ordernar nomes</button>

      <h2>Lista de pessoas: </h2>
      <ul>
      {listPeople.map((person) => (
        <li key={person.id}>
          <button onClick={() => deletePerson(person.id)}>[ DELETAR ]</button>
          <span style={{ marginLeft: "1rem" }}>{person.name}</span>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;

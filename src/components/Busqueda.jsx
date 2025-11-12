import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Busqueda = () => {
  const navigate = useNavigate();
  const { store } = useGlobalReducer();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar personas mientras escribes
  const filteredPeople = store.people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Doble click → navegar
  const handleDoubleClick = (uid) => {
    navigate(`/detailpeople/${uid}`);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar personaje..."
        list="people-datalist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onDoubleClick={(e) => {
          const selectedName = e.target.value;
          const person = store.people.find(p => p.name === selectedName);
          if (person) handleDoubleClick(person.uid);
        }}
      />

      {/* DATALIST: Autocompletado */}
      <datalist id="people-datalist">
        {filteredPeople.map((person) => (
          <option
            key={person.uid}
            value={person.name}
            onDoubleClick={() => handleDoubleClick(person.uid)}
          />
        ))}
      </datalist>

      {/* OPCIONAL: Mostrar resultados debajo (como dropdown) */}
 {/*      {searchTerm && filteredPeople.length > 0 && (
        <div
          className="position-absolute w-100 bg-white border rounded shadow-sm mt-1"
          style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}
        >
          {filteredPeople.map((person) => (
            <div
              key={person.uid}
              className="px-3 py-2 hover-bg-light"
              style={{ cursor: "pointer" }}
              onDoubleClick={() => handleDoubleClick(person.uid)}
              onClick={() => {
                setSearchTerm(person.name);
                handleDoubleClick(person.uid);
              }}
            >
              {person.name}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Busqueda;
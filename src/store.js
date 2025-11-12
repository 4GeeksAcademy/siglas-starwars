export const initialStore = () => {
  return {
    people: JSON.parse(localStorage.getItem('starwars_people')) || [],
    planet: JSON.parse(localStorage.getItem('starwars_planet')) || [],
    vehicles: JSON.parse(localStorage.getItem('starwars_vehicles')) ||[],
    favoritos: loadState(),
    message: null,
  }
}

const loadState = () => {
  try {
    const saved = localStorage.getItem('starwars_favoritos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveState = (favoritos) => {
  localStorage.setItem('starwars_favoritos', JSON.stringify(favoritos));
};

export default function storeReducer(store, action = {}) {
  let newFavoritos=[]
  switch (action.type) {
    case "GET_ALL_PEOPLE":
      localStorage.setItem('starwars_people', JSON.stringify(action.payload));
      return {
        ...store,
        people: action.payload
      }
    case "GET_ALL_PLANET":
      localStorage.setItem('starwars_planet', JSON.stringify(action.payload))
      return {
        ...store,
        planet: action.payload
      }
    case "GET_ALL_VEHICLES":
      localStorage.setItem('starwars_vehicle', JSON.stringify(action.payload))
      return {
        ...store,
        vehicles: action.payload
      }
    case "ADD_FAVORITOS":
      newFavoritos = [...store.favoritos, action.payload];
      saveState(newFavoritos); // ← GUARDA AQUÍ
      return {
/*         ...store,
        favoritos: [...store.favoritos, action.payload];
 */
     ...store, favoritos: newFavoritos 

      }
    case 'REMOVE_FAVORITOS':
      newFavoritos = store.favoritos.filter(f => f.uid+f.url !== action.payload.uid+action.payload.url)
      saveState(newFavoritos); // ← GUARDA AQUÍ
      return {
        ...store,
        favoritos: newFavoritos
      }
/*     case 'add_task':
 
      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
 */    default:
      throw Error('Unknown action.');
  }
}


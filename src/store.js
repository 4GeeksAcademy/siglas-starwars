export const initialStore=()=>{
  return{
    people: [],
    planet: [],
    vehicles: [],
    favoritos: [{
      description: "favorito 1",
      url: "/detailpeople/",
      uid: "1"
    }],
    message: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "GET_ALL_PEOPLE":
       return {
        ...store,
        people: action.payload
       }
    case "GET_ALL_PLANET":
      return {
        ...store,
        planet: action.payload
      }   
    case "GET_ALL_VEHICLES":
      return {
        ...store,
        vehicles: action.payload
      }
      case "ADD_FAVORITOS":
        return {
          ...store,
          favoritos: [...store.favoritos, action.payload]
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

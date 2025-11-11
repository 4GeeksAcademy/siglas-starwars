import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const People = () => {
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()
  

  const handlerDetail = (uid)=>{
      navigate(`/detailpeople/`+uid)
  }

  const handlerFavoritos = (uid,name,url)=>{
    const obj={
      description : name,
      uid: uid,
      url: url
    }
    dispatch({type: "ADD_FAVORITOS", payload: obj})
    
  }

  useEffect(() => {
    const getPeople = async () => {
      try {
        let response = await fetch("https://www.swapi.tech/api/people")
        if (!response) {
          throw new Error("Ocurrio un error")
        }
        let data = await response.json()
        dispatch({ type: "GET_ALL_PEOPLE", payload: data.results })
        console.log("DATA ", data.results)
        console.log("STORE.PEOPLE", store.people)
      } catch (error) {
        console.log(error)
      }

    }
    getPeople()
  }, [])

  /* 	const users = [
      { id: 1, name: 'Skaiwalker', img: 'men/15.jpg' },
      { id: 2, name: 'Leia', img: 'women/44.jpg' },
      { id: 3, name: 'Han', img: 'men/32.jpg' },
      { id: 4, name: 'Luke', img: 'men/75.jpg' },
      { id: 5, name: 'Yoda', img: 'men/82.jpg' },
      { id: 6, name: 'Rey', img: 'women/68.jpg' },
      { id: 7, name: 'Vader', img: 'men/45.jpg' },
    ]; */




  return (
    <div className="container my-3">
      <h3 className="mb-3">Personajes</h3>

      {/* Contenedor con borde y scroll */}
      <div className="border rounded-3 overflow-hidden bg-light p-3 shadow-sm">


        <div
          className="d-flex gap-3 overflow-x-auto pb-3"
          style={{
            // Solo esta línea es "CSS extra" (opcional para barra más bonita)
            scrollbarWidth: 'thin',
          }}
        >
          {store.people.map((user) => (
            <div
              key={user.uid}
              className="flex-shrink-0"
              style={{ width: '18rem' }}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={`https://randomuser.me/api/portraits/men/${user.uid}.jpg`}
                  className="card-img-top"
                  alt={user.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-4">{user.name}</h5>
                  {/* 									<p className="card-text text-muted small flex-grow-1">
										Personaje icónico
									</p> */}
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button className="btn btn-primary btn-sm" onClick={() => handlerDetail(user.uid)}>Learn more!</button>
                    <button className="btn btn-outline-danger btn-sm p-1">
                      <i className="bi bi-heart" onClick={()=>handlerFavoritos(user.uid,user.name,"/detailpeople/")}></i>
                    </button>
                    {/* 										<button className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center p-0"
											style={{ width: '32px', height: '32px' }}>
											<i className="bi bi-heart fs-6"></i>
										</button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default People
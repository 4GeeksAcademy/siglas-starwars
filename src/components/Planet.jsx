import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const Planet = () => {
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()


  const handlerDetail = (uid)=>{
      navigate(`/detailplanets/`+uid)
  }

 const handlerFavoritosPlanets = (uid,name,url)=>{
    let encontrado = store.favoritos.find((ele)=> ele.uid=== uid && ele.url===url)
    if(encontrado){
      alert("Este Planeta ya Existe en favoritos")
      return
    }
    const obj={
      description : name,
      uid: uid,
      url: url
    }
    dispatch({type: "ADD_FAVORITOS", payload: obj})
    
  }

  useEffect(() => {
    if(store.planet.length>0) return
    const getPlanet = async () => {
      try {
        let response = await fetch("https://www.swapi.tech/api/planets")
        if (!response) {
          throw new Error("Ocurrio un error")
        }
        let data = await response.json()
        dispatch({ type: "GET_ALL_PLANET", payload: data.results })
        console.log("DATA ", data.results)
        console.log("STORE.PLANET", store.planet)
      } catch (error) {
        console.log(error)
      }

    }
    getPlanet()
  }, [store.planet.length, dispatch])

 



  return (
    <div className="container my-3">
      <h3 className="mb-3">Planets</h3>

    
      <div className="border rounded-3 overflow-hidden bg-light p-3 shadow-sm">


        <div
          className="d-flex gap-3 overflow-x-auto pb-3"
          style={{
            scrollbarWidth: 'thin',
          }}
        >
          {store.planet.map((user) => (
            <div
              key={user.uid}
              className="flex-shrink-0"
              style={{ width: '18rem' }}
            >
              <div className="card h-100 shadow-sm">
                <img
                
                  src={`https://lumiere-a.akamaihd.net/v1/images/ahch-to-db-main_d13ac48c.jpeg`}
                  className="card-img-top"
                  alt={user.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-4">{user.name}</h5>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button className="btn btn-primary btn-sm" onClick={() => handlerDetail(user.uid)}>Learn more!</button>
                    <button className="btn btn-outline-danger btn-sm p-1">
                      <i className="bi bi-heart" onClick={()=> handlerFavoritosPlanets(user.uid,user.name,"/detailplanets/")}></i>
                    </button>
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

export default Planet
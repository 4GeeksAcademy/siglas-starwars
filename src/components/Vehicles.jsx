import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Vehicles = () => {
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()


  const handlerDetail = (uid)=>{
      navigate(`/detailvehicles/`+uid)
  }

const handlerFavoritosVehicles = (uid,name,url)=>{
    let encontrado = store.favoritos.find((ele)=> ele.uid=== uid && ele.url===url)
    if(encontrado){
      alert("Este Vehiculo ya Existe en Favoritos")
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
    if(store.vehicles.length>0) return
    const getVehicles = async () => {
      try {
        let response = await fetch("https://www.swapi.tech/api/vehicles")
        if (!response) {
          throw new Error("Ocurrio un error")
        }
        let data = await response.json()
        dispatch({ type: "GET_ALL_VEHICLES", payload: data.results })
        console.log("DATA ", data.results)
        console.log("STORE.VEHICLES", store.vehicles)
      } catch (error) {
        console.log(error)
      }

    }
    getVehicles()
  }, [store.vehicles.length, dispatch])

 



  return (
    <div className="container my-3">
      <h3 className="mb-3">Vehicles</h3>

    
      <div className="border rounded-3 overflow-hidden bg-light p-3 shadow-sm">


        <div
          className="d-flex gap-3 overflow-x-auto pb-3"
          style={{
            scrollbarWidth: 'thin',
          }}
        >
          {store.vehicles.map((user) => (
            <div
              key={user.uid}
              className="flex-shrink-0"
              style={{ width: '18rem' }}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={"https://lumiere-a.akamaihd.net/v1/images/tlj-db-canto-bight-speeder-main-image_182499ed.jpeg"}
                  className="card-img-top"
                  alt={user.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-4">{user.name}</h5>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button className="btn btn-primary btn-sm" onClick={() => handlerDetail(user.uid)}>Learn more!</button>
                    <button className="btn btn-outline-danger btn-sm p-1">
                      <i className="bi bi-heart" onClick={()=> handlerFavoritosVehicles(user.uid,user.name,"/detailvehicles/")}></i>
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

export default Vehicles
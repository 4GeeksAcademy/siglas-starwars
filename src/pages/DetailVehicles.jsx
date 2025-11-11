import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailVehicles = () => {
  const { uid } = useParams()
  const [detailVehicles, setDetailVehicles] = useState({})
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getVehicles = async () => {
      if (!uid) return;
      try {
        let response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
        if (!response.ok) throw new Error("Error personaje no encontrado")
        let data = await response.json()
        data = data.result.properties
        setDetailVehicles(data)

      } catch (error) {
        console.error("Error: ", error)
      } finally {
          // FORZAR QUE EL LOADER SE VEA AL MENOS 1 SEGUNDO
          await new Promise(resolve => setTimeout(resolve, 1000));
          setLoading(false);
      }

    }
    getVehicles()
    return () => {
     //setDetailVehicles([]);
    };
  }, [uid])


  useEffect(() => {
    //console.log("VEHICLES ACTUALIZADAS:", detailVehicles);
  }, []);




  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-light mt-2">Cargando detalles...</p>
      </div>
    );
  }

  



  return (
    <>
      <div className=" container bg-black p-3">
        <div className="card mb-3 container p-0 bg-black text-white mb-0" style1={{ "maxWidthth": "540px" }}>
          <div className="row g-0 ">
            <div className="col-md-7 ">
              <img
                src={`https://lumiere-a.akamaihd.net/v1/images/tlj-db-canto-bight-speeder-main-image_182499ed.jpeg`}
                                  
    className="card-img-top1"
                alt={detailVehicles}
                style={{ height: '380px',   objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-5 ps-4">
              <div className="card-body">
                <h5 className="card-title fs-3">{detailVehicles.name}</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero obcaecati quisquam voluptate. Voluptatum libero laboriosam officia perspiciatis! Est fuga sunt illum laboriosam, quaerat blanditiis temporibus, velit et incidunt saepe quos. lore
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut quisquam repellat sed, nobis praesentium at non laborum blanditiis sequi quam? Delectus dicta alias, quae laudantium porro a labore asperiores.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque provident ex eligendi sint quas non, ipsum iure rerum fugiat? Eos eveniet eius, dolorum ex velit optio ratione unde rerum facilis.
                </p>
                {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
          </div>
        </div>


        <div className="container bg-black py-3 px-0 ">
    
          <div className="row text-start text-md-center9 g-0"  >
            <div className="col-6 col-md-1 border-end border-secondary ">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold ">capacity</h6>
              <ul className="list-unstyled">
                 <li><small className="link-danger text-decoration-none">{detailVehicles.cargo_capacity}</small></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">passengers</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailVehicles.passengers}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">max_speed</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailVehicles.max_atmosphering_speed}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">crew</h6>
              <p className="mb-0 text-danger">{detailVehicles.crew}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">length</h6>
              <p className="mb-0 text-danger">
                {detailVehicles.length}
              </p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">model</h6>
              <p className="mb-0 text-danger">{detailVehicles.model}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">manufacturer</h6>
              <ul className="list-unstyled mb-0">
                    <li><small className="text-danger">{detailVehicles.manufacturer}</small></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">class</h6>
              <ul className="list-unstyled mb-0">
                    <li><small className="text-danger">{detailVehicles.vehicle_class}</small></li>
              </ul>
            </div>
 
     

          </div>
        </div>
      </div>







    </>
  )

}



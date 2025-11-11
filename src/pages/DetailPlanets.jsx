import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailPlanets = () => {
  const { uid } = useParams()
  const [detailPlanets, setDetailPlanets] = useState({})
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPlanets = async () => {
      if (!uid) return;
      try {
        let response = await fetch(`https://www.swapi.tech/api/planets/${uid}`)
        if (!response.ok) throw new Error("Error personaje no encontrado")
        let data = await response.json()
        data = data.result.properties
        setDetailPlanets(data)

      } catch (error) {
        console.error("Error: ", error)
      } finally {
          // FORZAR QUE EL LOADER SE VEA AL MENOS 1 SEGUNDO
          await new Promise(resolve => setTimeout(resolve, 1000));
          setLoading(false);
      }

    }
    getPlanets()
    return () => {
     //setDetailPlanets([]);
    };
  }, [uid])


  useEffect(() => {
    //console.log("PLANETS ACTUALIZADAS:", detailPlanets);
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
                src={`https://lumiere-a.akamaihd.net/v1/images/ahch-to-db-main_d13ac48c.jpeg`}
                className="card-img-top1"
                alt={detailPlanets}
                style={{ height: '380px',   objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-5 ps-4">
              <div className="card-body">
                <h5 className="card-title fs-3">{detailPlanets.name}</h5>
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
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold ">CLIMATE</h6>
              <ul className="list-unstyled">
                 <li><small className="link-danger text-decoration-none">{detailPlanets.climate}</small></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">SURFACE_WATER</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailPlanets.surface_water}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">DIAMETER</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailPlanets.diameter}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">rotation_period</h6>
              <p className="mb-0 text-danger">{detailPlanets.rotation_period}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">terrain</h6>
              <p className="mb-0 text-danger">
                {detailPlanets.terrain}
              </p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">gravity</h6>
              <p className="mb-0 text-danger">{detailPlanets.gravity}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">orbital_period</h6>
              <ul className="list-unstyled mb-0">
                    <li><small className="text-danger">{detailPlanets.orbital_period}</small></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">population</h6>
              <ul className="list-unstyled mb-0">
                    <li><small className="text-danger">{detailPlanets.population}</small></li>
              </ul>
            </div>
 
     

          </div>
        </div>
      </div>







    </>
  )

}



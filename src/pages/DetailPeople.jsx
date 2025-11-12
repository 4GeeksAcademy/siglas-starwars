import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const DetailPeople = () => {
  const { uid } = useParams()
  const [detailPeople, setDetailpeople] = useState({})
  const [apariciones, setApariciones] = useState([])
  const [loading, setLoading] = useState(true);
  const [planetas, setPlanetas] = useState([])
  const [naves, setNaves] = useState([])
  const [vehicles, setVehicles] = useState([])
  const {store,dispatch} = useGlobalReducer()
  useEffect(() => {
    const getDetail = async () => {
      if (!uid) return;
      // setLoading(true);
      //console.log("UID", parseInt(uid))
      try {
        let response = await fetch(`https://www.swapi.tech/api/people/${uid}`)
        if (!response.ok) throw new Error("Error personaje no encontrado")
        let data = await response.json()
        data = data.result.properties
        setDetailpeople(data)
        let ele = data
        const filmPromises = ele.films.map(filmUrl =>
          fetch(filmUrl).then(r => r.json())
        );
        const filmResults = await Promise.all(filmPromises);
        const films = filmResults.map(res => {
          const p = res.result.properties;
          return {
            title: p.title,
            episode_id: p.episode_id
          };
        });


        /*         const filmsData = await Promise.all(  // manera de hacerlo con await diferente al anterior
                  props.films.map(url => fetch(url).then(r => r.json()))
                );
                setApariciones(filmsData.map(f => ({
                  title: f.result.properties.title,
                  episode_id: f.result.properties.episode_id
                }))); */


        if (ele.homeworld) { // planetas
          //console.log("ele.homeworld", ele.homeworld)
          const planetRes = await fetch(ele.homeworld);
          const planetData = await planetRes.json();
          //console.log("PLANETAS :", planetData);

          setPlanetas([{ name: planetData.result.properties.name }]);
        }

        // 4. NAVES
        const shipsData = await Promise.all(
          ele.starships.map(url => fetch(url).then(r => r.json()).catch(() => null))
        );
        setNaves(shipsData.filter(Boolean).map(s => ({
          name: s.result.properties.name
        })));

        /*         // 5. ESPECIES /// esto esta pero en films/uid
                 const speciesData = await Promise.all(
                  ele.species.map(url => fetch(url).then(r => r.json()).catch(() => null))
                );
                setEspecies(speciesData.filter(Boolean).map(s => ({
                  name: s.result.properties.name
                })));
         */
        // 5. VEHICLES
        const vehiclesData = await Promise.all(
          ele.vehicles.map(url => fetch(url).then(r => r.json()).catch(() => null))
        );
        setVehicles(vehiclesData.filter(Boolean).map(s => ({
          name: s.result.properties.name
        })));

        setApariciones(films)

      } catch (error) {
        console.error("Error: ", error)
      } finally {
          // FORZAR QUE EL LOADER SE VEA AL MENOS 1 SEGUNDO
          await new Promise(resolve => setTimeout(resolve, 1000));
          setLoading(false);
      }

    }
    getDetail()
    return () => {
      setApariciones([]);
    };
  }, [uid])


  useEffect(() => {
    //console.log("APARICIONES ACTUALIZADAS:", apariciones);
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

  //console.log("PLANETAS :", planetas);
  //console.log("NAVES :", naves);
  //console.log("VEHICLES :", vehicles);
  //console.log("apariciones", apariciones)


  /* 
   //otra manera de hacer un promiseall falta probarlo
   const fetchAllItems = async () => {
    try {
      const responses = await Promise.all(
        ids.map(id => fetch(/api/item/${id}))
      );
  
      const results = await Promise.all(
        responses.map(res => res.json())
      );
  
      console.log(results);
      return results;
    } catch (error) {
      console.error("Error en las peticiones:", error);
    }
  };
  ///// fin de otra alternativa promiseall
    */




  return (
    <>
      <div className=" container bg-black p-3">
        <div className="card mb-3 container p-0 bg-black text-white mb-0" style1={{ "maxWidthth": "540px" }}>
          <div className="row g-0 ">
            <div className="col-md-4 ">
              <img
                src={`https://randomuser.me/api/portraits/men/${uid}.jpg`}
                className="card-img-top1"
                alt={detailPeople}
                style={{ height: '380px',   objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8 ps-4">
              <div className="card-body">
                <h5 className="card-title fs-3">{detailPeople.name}</h5>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero obcaecati quisquam voluptate. Voluptatum libero laboriosam officia perspiciatis! Est fuga sunt illum laboriosam, quaerat blanditiis temporibus, velit et incidunt saepe quos. lore
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut quisquam repellat sed, nobis praesentium at non laborum blanditiis sequi quam? Delectus dicta alias, quae laudantium porro a labore asperiores.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque provident ex eligendi sint quas non, ipsum iure rerum fugiat? Eos eveniet eius, dolorum ex velit optio ratione unde rerum facilis.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo eos, vitae inventore deleniti cupiditate, enim at, eum excepturi illum ab sit numquam obcaecati earum repellat nulla reprehenderit sapiente. Autem, dolor.
                </p>
                {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container bg-black py-3 px-0 ">
    
          <div className="row text-start text-md-center9 g-0"  >
            <div className="col-6 col-md-2 border-end border-secondary ">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold ">APPEARANCES</h6>
              <ul className="list-unstyled">
                {apariciones.map((ele, index) => (
                  
                    <div key={index}>
                      <li><small className="link-danger text-decoration-none">Star Wars: Episode {ele.episode_id} {ele.title}</small></li>
                    </div>

                ))
                }
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Birth Year</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailPeople.birth_year}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Gender</h6>
              <ul className="list-unstyled mb-0">
                <li><a href="#" className="link-danger text-decoration-none">{detailPeople.gender}</a></li>
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Height</h6>
              <p className="mb-0 text-danger">{detailPeople.height}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Skin Color</h6>
              <p className="mb-0 text-danger">
                {detailPeople.skin_color}
              </p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Eye Color</h6>
              <p className="mb-0 text-danger">{detailPeople.eye_color}</p>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Vehicles</h6>
              <ul className="list-unstyled mb-0">
                {(vehicles.length>0)?vehicles.map((ele, index) => (
                  <div key={index}>
                    <li><small className="text-danger">{ele.name}</small></li>
                  </div>
                )):<small className="text-danger">n/a</small>}
              </ul>
            </div>

            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Starships</h6>
              <ul className="list-unstyled mb-0">
                {(naves.length>0)?naves.map((ele, index) => (
                  <div key={index}>
                    <li><small className="text-danger">{ele.name}</small></li>
                  </div>
                )):<small className="text-danger">n/a</small>}
              </ul>
            </div>
            <div className="col-6 col-md px-3 border-end border-secondary">
              <h6 className="text-uppercase text-secondary mb-2 fw-semibold">Planeta</h6>
              <ul className="list-unstyled mb-0">
                {(planetas.length>0)?planetas.map((ele, index) => (
                  <div key={index}>
                    <li><small className="text-danger">{ele.name}</small></li>


                  </div>
                )):<small className="text-danger">n/a</small>}
              </ul>
            </div>







          </div>
        </div>

				<Link to="/">
					<span className="navbar-brand mb-0 h1">Return</span>
				</Link> 
      </div>
  




    </>
  )

}



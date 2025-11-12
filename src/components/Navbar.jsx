import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
export const Navbar = () => {
	const [ favoritoAEliminar, setFavoritoAEliminar] = useState(null)
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()
	console.log("store.favoritos", store.favoritos)
	const handlerUrl = (obj) => {
		navigate(`${obj.url}${obj.uid}`)
	}

const abrirModal = (ele) => {
	console.log("verificar akika", ele)
    setFavoritoAEliminar(ele);
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
  };

const confirmarEliminar = () => {
    if (favoritoAEliminar) {
      dispatch({ type: 'REMOVE_FAVORITOS', payload: favoritoAEliminar });
      setFavoritoAEliminar(null);
    }
  };

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Start-Wars</span>
				</Link>
				<div className="ml-auto">
					{/* 					<Link to="/demo">
						<button className="btn btn-primary">Favoritos</button>
					</Link> */}
					<div className="dropdown ">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos
							{store.favoritos.length > 0 && (
								<span className="badge bg-danger text-bg-secondary ms-1">
									{store.favoritos.length}
								</span>
							)}
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							{store.favoritos.length === 0 ? (
								<li>
									<span className="dropdown-item text-muted text-center">
										Empty
									</span>
								</li>
							) : (
								store.favoritos.map((ele, index) => (
									<div key={index} className="d-flex justify-content-between mb-1">
										<li><button className="dropdown-item text-decoration-none ps-2 flex-grow-1" onClick={() => handlerUrl(ele)}>{ele.description}</button></li>
										<li className=" dropdown-iteml fas fa-trash ms-3 aling-right pe-2" onClick={() => abrirModal(ele)}></li>
									</div>
								))
							)
							}
						</ul>
					</div>
				</div>
			</div>

{/* === MODAL DE ELIMINAR === */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Eliminar favorito</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center">
              <p>¿Eliminar <strong>{favoritoAEliminar?.description}</strong> de favoritos?</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                data-bs-dismiss="modal"
                onClick={confirmarEliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

		</nav>
	);
};
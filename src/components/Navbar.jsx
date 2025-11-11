import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const Navbar = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()
	console.log("store.favoritos", store.favoritos)
	const handlerUrl = (obj) => {
		const cleanUrl = obj.url.trim().replace(/\/+$/, '/');
		const cleanUid = String(obj.uid).trim();

		// 2. Navega con ruta absoluta
		navigate(`${cleanUrl}${cleanUid}`)
		/* 		let firts = obj.url
				let second = obj.uid
				let third = firts+second
				console.log(third) */

	}

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
					<div class="dropdown ">
						<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos <span class="badge text-bg-secondary">{store.favoritos.length}</span>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							{store.favoritos?.map((ele, index) => (
								<div className="d-flex justify-content-between mb-1">
									<li><a class="dropdown-itemñ text-decoration-none ps-2" href="" onClick={() =>  handlerUrl(ele)}>{ele.description}</a></li>
									<li className=" dropdown-iteml fas fa-trash ms-3 aling-right pe-2" onClick={() => abrirModal(ele)}></li>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
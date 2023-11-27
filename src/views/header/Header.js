import "../header/styles/HeaderStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ItemSearch from "./components/ItemSearch";
let img = require("./hello_kitty.png")
let logo = require("./logo-turi.png")
let imgSearch = require("./search.png")
let favorite = require("./favorite.png")
let planner = require("./planner.png")
let profileIcon = require("./profile_icon.png")

// clase vista Header
function Header() {

    // useEffect se ejecuta en la primera carga de la vista
    useEffect(() => {
        //getData()
    })

    // variable de estado de la foto del usuario
    const [photo, setPhoto] = useState("");
    const userToken = window.sessionStorage.getItem("userToken");

    const [search, setSearch] = useState("")
    const [filteredList, setFilteredList] = useState([])
    const [searchClicked, setSearchClicked] = useState(0)

    async function getByName() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/LugarRouter/getBarraBusqueda?nombre=${search}`, {
                    method: "GET"
                })
                const data = await response.json()
                if(Array.isArray(data)){
                    const firstSeven = data.slice(0, 7)
                    setFilteredList(firstSeven)
                }else{
                    setFilteredList(data)
                }
                setSearchClicked(1)
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }


    // para la navegación entre pantallas
    const navigate = useNavigate();

    function handlePlannerClick() {
        navigate("/itinerary")
    }

    function handleFilterClick() {
        navigate("/searchScreen")
    }

    function handleFavoriteClick() {
        navigate("/favorites")
    }

    function handleProfileClick() {
        navigate("/profile")
    }

    // en caso de logout
    function handleLogoutClick() {
        navigate("/")
        // elimina el id del usuario en sesión
        window.sessionStorage.removeItem("userToken")
        window.sessionStorage.removeItem("userId")
    }

    const [buttonSelection, setButtonSelection] = useState(-1)

    // muestra placeholder o la foto del usuario
    let photoHeader;
    if (photo == "usuario pipi") {
        photoHeader =
            <>
                <img src={profileIcon} alt="mdo" width="40" height="40" class="rounded-circle" />
            </>
    } else {
        photoHeader =
            <>
                <img src={photo} alt="mdo" width="40" height="40" class="rounded-circle" />
            </>
    }

    let filter;
    if (Array.isArray(filteredList) && search !== "") {
        filter =
            <>
                {filteredList.map((item) => (
                    <ItemSearch
                        item={item}
                    />
                ))
                }
            </>
    } else if (!Array.isArray(filteredList) && search !== "") {
        filter =
            <>
                <div style={{ color: "gray" }} className="options">
                    No se encontraron resultados...
                </div>
            </>
    }

    return (
        <>
            <header class="header p-3 border-bottom w-100">
                <div class="container" style={{ maxWidth: "100%" }}>
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <div class="col-lg-3 d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <a href="/home" class="btn btn-logo">
                                <img class="logo" src={logo} width="100" height="60" />
                            </a>
                        </div>
                        <form className="search-bar-dropdown d-flex col-lg-7 mb-3 mb-lg-0" style={{ position: "relative" }}>
                            <div class="input-group searchBar">
                                <span class="input-group-text filter" onClick={handleFilterClick} id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                                    </svg>
                                </span>
                                <input type="text" onChange={(e) => {setSearch(e.target.value); getByName();}} class="form-control search-bar" placeholder="Buscar..." aria-label="Buscar" aria-describedby="basic-addon1" />
                                <span class="input-group-text searchButton" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </span>
                            </div>

                            <ul className="list-group group-options">
                                {filter}
                            </ul>
                        </form>

                        <div class="container-icons d-flex align-items-center justify-content-end">
                            <div class="container-icons justify-content-end p-2">
                                <div class="row">
                                    <div class="col-sm">
                                        <span><img src={planner} width="25" height="25" onClick={handlePlannerClick} /></span>
                                    </div>
                                    <div class="col-sm">
                                        <span><img src={favorite} width="25" height="25" onClick={handleFavoriteClick} /></span>
                                    </div>
                                </div>
                            </div>

                            <div class="dropdown text-end ms-3">
                                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <p className="profile">Mi perfil</p>
                                </a>
                                <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                    <li><a class="dropdown-item" onClick={handleProfileClick} onMouseLeave={() => setButtonSelection(-1)} onMouseOver={() => setButtonSelection(0)} style={{ backgroundColor: (buttonSelection == 0) ? "#588a4d" : (buttonSelection == 1) ? "white" : "white", color: (buttonSelection == 0) ? "white" : (buttonSelection == 1) ? "black" : "black" }} href="#">Mi perfil</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" onClick={handleLogoutClick} onMouseLeave={() => setButtonSelection(-1)} onMouseOver={() => setButtonSelection(1)} style={{ backgroundColor: (buttonSelection == 0) ? "white" : (buttonSelection == 1) ? "#588a4d" : "white", color: (buttonSelection == 0) ? "black" : (buttonSelection == 1) ? "white" : "black" }} href="#">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );

}

export default Header;
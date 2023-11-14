import "../header/styles/HeaderStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
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
        getData()
    })

    // variable de estado de la foto del usuario
    const [photo, setPhoto] = useState("");
    const userToken = window.sessionStorage.getItem("userToken");

    // función fecth para traer la foto del usuario
    async function getProfilePhoto() {
        await fetch(`http://localhost:3000/api/v1/UsuarioRouters/getFoto?token=${userToken}`)
            .then(response => response.json())
            .then(data => {
                console.log("Profile pic: "+data.foto); // Verificar los datos obtenidos desde el servidor
                setPhoto(data.foto);
            })
            .catch(error => console.log('Ocurrió un error:', error));
    }

    // función async que indica await a getProfilePhoto en la espera de que se traiga la foto para mostrar la vista
    async function getData(){
        await getProfilePhoto();
    }

    // para la navegación entre pantallas
    const navigate = useNavigate();

    function handlePlannerClick() {
        navigate("/itinerary")
    }

    function handleSearchClick() {
        alert("BÚSQUEDA")
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

    return (
        <>
            <header class="header p-3 mb-3 border-bottom">
                <div class="container" style={{ maxWidth: "100%" }}>
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/home" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <button class="btn btn-logo">
                                <img class="logo" src={logo} width="100" height="60" />
                            </button>
                        </a>

                        <ul class="navbar col-12 col-lg-auto me-lg-5 mb-3 justify-content-center mb-md-0">
                            <a href="#" class="nav-link item-header px-2 link-light" style={{ fontWeight: "bold" }}>Restaurantes</a>
                            <a href="#" class="nav-link item-header px-2 link-light" style={{ fontWeight: "bold" }}>Lugares turísticos</a>
                            <a href="#" class="nav-link item-header px-2 link-light" style={{ fontWeight: "bold" }}>Actividades</a>
                        </ul>

                        <form class="search-bar-components col-12 col-lg-5 mb-3 mb-lg-0">
                            <input type="search" class="form-control search-bar" placeholder="Buscar..." aria-label="Buscar" />
                            <div class="input-group-btn">
                                <button class="btn search-button" ><img class="icon-search" onClick={handleSearchClick} src={imgSearch} /></button>
                            </div>
                        </form>

                        <div class="container-icons d-flex">
                            <div class="container-icons justify-content-start p-2">
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
                                    {photoHeader}
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
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

function Header() {

    useEffect(() => {
        getData()
    })

    const [photo, setPhoto] = useState("");
    const userId = window.sessionStorage.getItem("usuarioId");

    async function getProfilePhoto() {
        await fetch(`http://localhost:3000/usuarios/getFoto?id=${userId}`)
            .then(response => response.text())
            .then(data => {
                console.log("Profile pic: "+data); // Verificar los datos obtenidos desde el servidor
                setPhoto(data);
            })
            .catch(error => console.log('Ocurrió un error:', error));
    }

    async function getData(){
        await getProfilePhoto();
    }

    const navigate = useNavigate();

    function handlePlannerClick() {
        navigate("/itinerary")
    }

    function handleSearchClick() {
        alert("BÚSQUEDA")
    }

    function handleFavoriteClick() {
        alert("FAVORITOS")
    }

    function handleProfileClick() {
        navigate("/profile")
    }

    function handleLogoutClick() {
        navigate("/")
    }

    const [buttonSelection, setButtonSelection] = useState(-1)

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
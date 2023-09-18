import "../header/styles/HeaderStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
let img = require("./hello_kitty.png")
let imgSearch = require("./search.png")
let favorite = require("./favorite.png")
let planner = require("./planner.png")

function Header() {

    function handlePlannerClick() {
        alert("PLANIFICAR")
    }

    function handleSearchClick(){
        alert("BÚSQUEDA")
    }

    function handleFavoriteClick(){
        alert("FAVORITOS")
    }

    const [buttonSelection, setButtonSelection] = useState(-1)

    return (
        <>
            <header class="header p-3 mb-3 border-bottom">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            <button class="btn btn-logo">
                                <img class="logo" src={img} width="70" height="70" />
                            </button>
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-5 mb-3 justify-content-center mb-md-0">
                            <li><a href="#" class="nav-link item-header px-2 link-light">Restaurantes</a></li>
                            <li><a href="#" class="nav-link item-header px-2 link-light">Lugares turísticos</a></li>
                            <li><a href="#" class="nav-link item-header px-2 link-light">Actividades</a></li>
                        </ul>

                        <form class="search-bar-components col-12 col-lg-5 mb-3 mb-lg-0">
                            <input type="search" class="form-control search-bar" placeholder="Buscar..." aria-label="Buscar" />
                            <div class="input-group-btn">
                                <button class="btn search-button" ><img class="icon-search" onClick={handleSearchClick} src={imgSearch} /></button>
                            </div>
                        </form>

                        <div class="container-icons justify-content-start p-2">
                            <div class="row">
                                <div class="col-sm">
                                    <span><img src={planner} width="30" height="30" onClick={handlePlannerClick} /></span>
                                </div>
                                <div class="col-sm">
                                    <span><img src={favorite} width="30" height="30" onClick={handleFavoriteClick} /></span>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown text-end ms-3">
                            <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={img} alt="mdo" width="40" height="40" class="rounded-circle" />
                            </a>
                            <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" onMouseOver={()=> setButtonSelection(0)} style={{ backgroundColor: (buttonSelection == 0) ? "#588a4d" : (buttonSelection==1) ? "white":"transparent", color: (buttonSelection == 0) ? "white" : (buttonSelection==1)?"black":"black" }} href="#">Mi perfil</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" onMouseOver={() => setButtonSelection(1)} style={{ backgroundColor: (buttonSelection == 0) ? "white" : (buttonSelection==1) ? "#588a4d":"transparent", color: (buttonSelection == 0) ? "black" : (buttonSelection==1)?"white":"black" }} href="#">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );

}

export default Header;
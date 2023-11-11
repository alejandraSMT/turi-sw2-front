import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import ModalFavoriteCard from './components/ModalFavoriteCard';
import "./style/ModifyItinerary.css"
import { Button, Modal } from 'react-bootstrap';

function ModifyItinerary() {

    const userToken = window.sessionStorage.getItem("userToken")

    const { idViaje } = useParams();
    const [arrayFavorites, setArrayFavorites] = useState([]);
    const [stillLoading, setStillLoading] = useState(false);

    const [selectedFavorites, setSelectedFavorites] = useState([]);
    const [clicks,setClicks] = useState(0)
    const [reload, setReload] = useState(true)

    const days = ["Dia 1", "Dia 2"]

    const navigate = useNavigate()

    /*const arrayDays = Array.from({ length: cantDays }, (_, index) => index + 1);

    // Actualiza el estado con los días generados
    setArrayDays(arrayDays);*/

    useEffect(() => {
        setStillLoading(true)
        getAllInfoPlace()
    }, []);


    //getAllFavorites: funcion donde se hace el llamado al endpoint "TraerTodosFav" enviando como parametro el idUsuario 
    //y poder buscar todos los favoritos que tenga agregados el usuario
    async function getAllFavorites() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/FavoritoRouter/TraerTodosFav?token=${userToken}`, {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
                console.log(data)
                console.log(data)
            } catch (error) {
                reject(error)
            }
        })
    }


    //getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
    //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
    async function getAllInfoPlace() {
        try {
            setStillLoading(true)
            //llama primero a la funcion "getAllFavorites" para traer todos los favoritos
            var AllFavorites = await getAllFavorites()
            console.log("Favorites list: ", AllFavorites)
            //se setea el array de favoritos con la lista de favoritos para ser mostrada luego en pantalla
            setArrayFavorites(AllFavorites)
            setStillLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    console.log("FAVORITOS LISTA: " + arrayFavorites)

    function goHome() {
        navigate("/home")
    }

    function resetValues() {
        setSelectedFavorites([])
        setClicks(0)
        setReload(true)
    }

    let noFavorites;
    if (arrayFavorites.length < 0) {
        noFavorites =
            <>
                <div class="column" style={{ justifyContent: "center", marginTop: "2rem" }}>
                    <h5 style={{ textAlign: "center" }}>Actualmente no tiene favoritos agregados</h5>
                    <div class="container d-flex justify-content-center">
                        <button class="btn btnHome" onClick={goHome} style={{ marginTop: "1rem" }} >Ir al inicio</button>
                    </div>
                </div>
            </>
    }

    let view;
    if (!stillLoading) {
        view =
            <>
                <div class="modal fade" id="addToDay" tabindex="-1" aria-labelledby="addToDayLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addToDayLabel">Agregar al día: </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row d-flex align-items-center" style={{ padding: "10px" }}>
                                    {Array.from(arrayFavorites).map((favorite) => (
                                        <>
                                            <div class="d-flex">
                                                <ModalFavoriteCard
                                                    favorite={favorite}
                                                    selectedFavorites={selectedFavorites}
                                                    setSelectedFavorites={setSelectedFavorites}
                                                    clicks = {clicks}
                                                    setClicks = {setClicks}
                                                    reload = {reload}
                                                    setReload = {setReload}
                                                />
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <Button id="cancelButton" onClick={resetValues} data-bs-dismiss="modal">Cancelar</Button>
                                <Button id="Button" onClick={resetValues} data-bs-dismiss="modal">Agregar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    }

    return (
        <>
            <Header />
            <div class="container mt-5 p-5" style={{ borderColor: "red", border: "1px solid", borderRadius: "20px" }}>
                <div class="column">
                    <h2>Nombre del Itinerario</h2>
                    <div class="d-flex" style={{ alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar" viewBox='0 0 16 16'>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <h5 style={{ padding: "1rem", textAlign: "center" }}> dias</h5>
                    </div>
                </div>
            </div>
            <div class="container">
                {noFavorites}
            </div>
            <div class="container mt-3">
                {days.map((day, index) => (
                    <div key={index}>
                        <div class="d-flex" style={{ alignContent: "center", alignItems: "center" }}>
                            <h2 style={{ padding: "1rem", marginBlock: "1rem", textAlign: "center" }}> {day} </h2>
                            <svg data-bs-toggle="modal" data-bs-target="#addToDay" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>
                        {/*<Day key={index} dayNumber={day} index={index} days={arrayDays} arrayFavorites={arrayFavorites} idViaje={idViaje} />*/}
                    </div>
                ))}
            </div>

            {view}

        </>
    );
}
export default ModifyItinerary;
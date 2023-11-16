import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import DayCard from './components/DayCard';
import ModalFavoriteCard from './components/ModalFavoriteCard';
import "./style/ModifyItinerary.css"
import { Button, Modal } from 'react-bootstrap';

let imgLima = require("./images/lima.jpg")

function ModifyItinerary() {

    const userToken = window.sessionStorage.getItem("userToken")

    const { idViaje } = useParams();
    const [arrayFavorites, setArrayFavorites] = useState([]);
    const [stillLoading, setStillLoading] = useState(false);

    const [itineraryInfo, setItineraryInfo] = useState([])

    const [selectedFavorites, setSelectedFavorites] = useState([]);
    const [clicks, setClicks] = useState(0)
    const [reload, setReload] = useState(true)
    const [days, setDays] = useState([])
    const [cantDias, setCantDias] = useState("")
    const [itineraryName, setItineraryName] = useState("")
    const [itineraryList, setItineryList] = useState([])

    const [daySelected, setDaySelected] = useState("")
    const [placeSelected, setPlaceSelected] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        setStillLoading(true)
        getAllData()
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
                console.log("getAllFavorites data recieved: ", data)
            } catch (error) {
                reject(error)
            }
        })
    }



    async function getItinerary() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/ViajeLugarRouter/traerItinerarioPorId?token=${userToken}&idViaje=${idViaje}`, {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
                console.log(data)
                var allDays = [];
                for (var i = 1; i <= itineraryInfo.data.cantDias; i++) {
                    allDays.push(i);
                }
                setCantDias(data.data.cantDias)
                setItineraryName(data.data.nombreViaje)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function settingInfo(allInfo) {
        try {
            var allDays = [];
            for (var i = 1; i <= allInfo.data.cantDias; i++) {
                allDays.push(i);
            }
            setDays(allDays)
            console.log("Array generado: ", allDays)


            setCantDias(allInfo.data.cantDias)
            setItineraryName(allInfo.data.nombreViaje)

        } catch (error) {
            console.error(error)
        }
    }


    //getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
    //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
    async function getAllData() {
        try {
            setStillLoading(true)

            var AllFavorites = await getAllFavorites()
            console.log("Favorites list: ", AllFavorites)
            //se setea el array de favoritos con la lista de favoritos para ser mostrada luego en pantalla
            setArrayFavorites(AllFavorites)

            var allInfo = await getItinerary()
            console.log("Itinerary data: ", allInfo)
            setItineraryInfo(allInfo)

            await settingInfo(allInfo)

            console.log("DIAS EN DATA: ", allInfo.data.dias[0].lugares.length)

            setStillLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const registrarLugar = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/ViajeLugarRouter/registro`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                resolve(response)
                console.log(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    const handleClickSave = async () => {
        const data = {
            "data": {
                "idViaje": idViaje,
                "numDia": daySelected,
                "idLugar": placeSelected
            }
        }
        try {

            console.log("DATA ENVIADA: ", data)

            var response = await registrarLugar(data)
            if (response.status !== 200) {
                alert("Ha ocurrido un error al registrar el lugar")
                return
            }
            window.location.reload();

            setSelectedFavorites([])
            setClicks(0)
            setReload(true)
            setDaySelected('')
            setPlaceSelected('')

        } catch (error) {
            console.log(error)
        }
    }


    function goHome() {
        navigate("/home")
    }

    function resetValues() {
        setSelectedFavorites([])
        setClicks(0)
        setReload(true)
    }

    let modalNoFavorites;
    if (!Array.isArray(arrayFavorites)) {
        modalNoFavorites =
            <>
                <div class="modal-body">
                    <div class="row d-flex align-items-center" style={{ padding: "10px" }}>
                        <div class="column" style={{ justifyContent: "center", marginTop: "2rem" }}>
                            <h6 style={{ textAlign: "center" }}>Actualmente no tiene favoritos agregados</h6>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <Button id="Button" onClick={goHome} data-bs-dismiss="modal">Ir al inicio</Button>
                </div>
            </>
    } else {
        modalNoFavorites =
            <>
                <div class="modal-body">
                    <div class="row d-flex align-items-center" style={{ padding: "10px" }}>
                        {Array.from(arrayFavorites).map((favorite) => (
                            <>
                                <div class="d-flex">
                                    <ModalFavoriteCard
                                        favorite={favorite}
                                        selectedFavorites={selectedFavorites}
                                        setSelectedFavorites={setSelectedFavorites}
                                        clicks={clicks}
                                        setClicks={setClicks}
                                        reload={reload}
                                        setReload={setReload}
                                        setPlaceSelected={setPlaceSelected}
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div class="modal-footer">
                    <Button id="cancelButton" onClick={resetValues} data-bs-dismiss="modal">Cancelar</Button>
                    <Button id="Button" onClick={handleClickSave} data-bs-dismiss="modal">Agregar</Button>
                </div>
            </>
    }

    let view;
    if (!stillLoading) {
        view =
            <>
                <div class="container mt-5 ps-5" style={{ border: "1px solid lightgray", borderRadius: "20px" }}>
                    <div class="row d-flex" style={{ alignItems: "center" }}>
                        <div class="col-lg-4">
                            <h2> {itineraryName} </h2>
                            <div class="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar" viewBox='0 0 16 16'>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>
                                <h5 style={{ margin: "1rem", textAlign: "center" }}> {cantDias} dias</h5>
                            </div>
                        </div>
                        <div class="col-lg-8 d-flex p-0">
                            <img class="w-100" src={imgLima} style={{ width: "80rem", maxHeight: "15rem", objectFit: "cover", borderRadius: "0rem 20px 20px 0rem" }} />
                        </div>
                    </div>
                </div>
                <div class="container mt-3 mb-5">
                    {days.map((day, index) => (
                        < DayCard
                            day={day}
                            setDaySelected={setDaySelected}
                            index={index}
                            itineraryInfo={itineraryInfo}
                        />
                    ))}
                </div>


                <div class="modal fade" id="addToDay" tabindex="-1" aria-labelledby="addToDayLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addToDayLabel">Agregar al día: </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {modalNoFavorites}
                        </div>
                    </div>
                </div>
            </>
    }

    return (
        <>
            <Header />
            {view}

        </>
    );
}
export default ModifyItinerary;
import "./styles/HomeScreenStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "../header/Header";
import ElementsGroupView from "./components/ElementsGroupView";
import { useEffect, useState } from "react";

function HomeScreen() {

    const usuarioId = window.sessionStorage.getItem("usuarioId");
    const [restaurants, setRestaurants] = useState([]);
    const [turistics, setTuristics] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        handleGetRestaurants();
        handleGetTuristic();
        handleGetActivities();
    }, [])


    var elements = [
        {
            "id": "1",
            "nombre": "Tanta",
            "descripcion": "Descripcion sobre Tanta",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "2",
            "nombre": "La Rosa Náutica",
            "descripcion": "Descripcion sobre La Rosa Náutica",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "3",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },

        {
            "id": "4",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "5",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "6",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "7",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "8",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "precio": "s/20",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "9",
            "nombre": "Lugar 1",
            "descripcion": "Descripcion sobre Lugar 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "precio": "s/20",
            "idTipo": "2",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "10",
            "nombre": "Lugar 2",
            "descripcion": "Descripcion sobre Lugar 2",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 1pm",
            "precio": "s/20",
            "idTipo": "2",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "11",
            "nombre": "Actividad 1",
            "descripcion": "Descripcion sobre Actividad 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "precio": "s/20",
            "idTipo": "3",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        }
    ]

    console.log("ID_USUARIO home " + usuarioId)

    async function getRestaurantes() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/lugares/top5restaurantes?id=${usuarioId}`, {
                    method: "GET"
                })
                const data = await response.json()
                var rests = []
                data.forEach(element => {
                    rests.push(element)
                });
                resolve(rests)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function handleGetRestaurants() {
        await getRestaurantes()
            .then(data => {
                setRestaurants(data)
                console.log("RESTAURANTES: " + restaurants)
            }).catch(error => console.log('Ocurrió un error:', error))
    }

    async function getTuristic() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/lugares/top5LugarTuristico?id=${usuarioId}`, {
                    method: "GET"
                })
                const data = await response.json()
                var turis = []
                data.forEach(element => {
                    turis.push(element)
                });
                resolve(turis)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function handleGetTuristic() {
        await getTuristic()
            .then(data => {
                setTuristics(data)
                console.log("LUGARES TURI: " + turistics)
            }).catch(error => console.log('Ocurrió un error:', error))
    }

    async function getActivities() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/lugares/top5Actividad?id=${usuarioId}`, {
                    method: "GET"
                })
                const data = await response.json()
                var acts = []
                data.forEach(element => {
                    acts.push(element)
                });
                resolve(acts)
            } catch (error) {
                reject(error)
            }
        })
    }

    const activitiesAndy = async()=>{
        const resp = await fetch('http://localhost:3000/lugares/top5Actividad', {
            method: "GET"
        })
        const data = await resp.json()
        console.log("andy")
        console.log(data)

    }

    const activitiesAndy2 = async()=>{
        const resp = await fetch('http://localhost:3000/lugares/top5LugarTuristico', {
            method: "GET"
        })
        const data = await resp.json()
        console.log("andy2")
        console.log(data)

    }

    async function handleGetActivities() {
        await getActivities()
            .then(data => {
                setActivities(data)
                console.log("LUGARES TURI: " + activities)
            }).catch(error => console.log('Ocurrió un error:', error))
    }


    return (
        <>
            <div className="w-100">
                <div>
                    <Header />
                </div>
                <div class="row" style={{ padding: "0rem 5rem 5rem 5rem" }}>
                    <ElementsGroupView
                        restaurants={restaurants}
                        turistics={turistics}
                        activities={activities}
                        elements={elements}
                    />
                </div>
            </div>
        </>
    );

}

export default HomeScreen;
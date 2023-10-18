import "./styles/HomeScreenStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "../header/Header";
import ElementsGroupView from "./components/ElementsGroupView";
import { useEffect, useState } from "react";

function HomeScreen() {

    const usuarioId = window.sessionStorage.getItem("usuarioId");

    // variables de estado tipo array que almacenan los restaurantes, lugares turísticos y actividades
    const [restaurants, setRestaurants] = useState([]);
    const [turistics, setTuristics] = useState([]);
    const [activities, setActivities] = useState([]);

    // en la carga de la página llama a la función getHomeData que es de tipo async
    useEffect(() => {
       getHomeData()
    }, [])


    // función fetch para traer la lista del top5 de restaurantes de la base de datos
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

    // función fetch para traer la lista del top5 de lugares turísticos de la base de datos
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

    // función fetch para traer la lista del top5 de actividades de la base de datos
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

    // la función getHomeData que se llama en el useEffect
    // se encarga de la carga y llenado de las listas de restaurantes, lugares turísticos y actividades
    async function getHomeData()  {

        try {
            // cada función de get es una promesa para asegurarse de que termina de traer todos los datos
            // además, son await dentro de una función async para hacer la carga de forma secuencial
            var restaurantes = await getRestaurantes()
            var turistics = await getTuristic()
            var activities = await getActivities()

            setRestaurants(restaurantes)
            setTuristics(turistics)
            setActivities(activities)
            console.log("TODO OK")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="w-100">
                <div>
                    <Header />
                </div>
                <div class="row" style={{ padding: "0rem 5rem 5rem 5rem" }}>
                    {/*GroupView es el bloque del HomeScreen que muestra la lista de restaurantes, lugares y actividades*/}
                    <ElementsGroupView
                        restaurants={restaurants}
                        turistics={turistics}
                        activities={activities}
                    />
                </div>
            </div>
        </>
    );

}

export default HomeScreen;
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
       getHomeData()
    }, [])

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

    async function getHomeData()  {

        try {
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
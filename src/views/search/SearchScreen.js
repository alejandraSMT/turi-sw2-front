import { useEffect, useState } from "react"
import Header from "../header/Header.js"
import "./style/SearchScreen.css"

<>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</>

function SearchScreen() {

    useEffect(() => {
        getAllFilters()
    }, [])

    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([])
    const [districts, setDistricts] = useState([])

    async function getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/CategoriaRouters/getTodasCategorias", {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function getTypes() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/LugarRecomendadoRouter/getTodosLugarRecomendado", {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function getDistrict() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/DistritoRouter/getTodosDistritos", {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function getAllFilters() {
        try {
            var categories = await getCategories()
            setCategories(categories)
            console.log("CATEGORIES: ", categories)

            var types = await getTypes()
            setTypes(types)
            console.log("TYPES: ", types)

            var district = await getDistrict()
            setDistricts(district)
            console.log("DISTRICTS: ", district)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div class="container pt-5 pb-5">
                <div class="col-lg-2">
                    <h3>Filtros: </h3>
                    <p>
                        <a style={{ textAlign: "start" }} class="btn btn-primary btn-filter" data-bs-toggle="collapse" href="#collapseCategories" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Categorías
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                        </a>
                    </p>
                    <div class="collapse pb-3" id="collapseCategories">
                        <div class="card card-body">
                            {categories.map((cat) => (
                                <div key={cat.id} class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {cat.nombre}
                                    </label>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <p>
                        <a class="btn btn-primary btn-filter" data-bs-toggle="collapse" href="#collapseTypes" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Tipos de lugares
                        </a>
                    </p>
                    <div class="collapse pb-3" id="collapseTypes">
                        <div class="card card-body">
                            {types.map((type) => (
                                <div key={type.id} class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {type.lugar}
                                    </label>
                                </div>
                            ))
                            }
                        </div>
                    </div>

                    <p>
                        <a class="btn btn-primary btn-filter" data-bs-toggle="collapse" href="#collapseDistrict" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Distritos
                        </a>
                    </p>
                    <div class="collapse pb-3" id="collapseDistrict">
                        <div class="card card-body">
                            {districts.map((district) => (
                                <div key={district.id} class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        {district.distrito}
                                    </label>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SearchScreen
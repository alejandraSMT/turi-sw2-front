import { useEffect, useState, useRef } from "react"
import Header from "../header/Header.js"
import "./style/SearchScreen.css"
import SearchItemCard from "./components/SearchItemCard.js"
import RadioCategory from "./components/RadioCategory.js"
import RadioType from "./components/RadioType.js"
import RadioDistrict from "./components/RadioDistrict.js"

<>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</>


function SearchScreen() {

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [data, setData] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const districtRadioRef = useRef(null);
    const typeRadioRef = useRef(null);
    const categoryRadioRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            await getAllSearchInfo()
            await getData();
        };

        fetchData();
    }, [selectedCategory, selectedType, selectedDistrict]);

    console.log("CATEGORIA SELECCIONADA: ", selectedCategory)

    async function getAllData() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/LugarRouter/getFiltradoBusqueda?idCategoriaPadre=${selectedCategory}&idDistrito=${selectedDistrict}&idLugarRecomendado=${selectedType}`, {
                    method: "GET"
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    async function getCategories() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/CategoriaPadreRouter/getTodasCategoriasPadres", {
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

    async function getAllSearchInfo() {
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

    async function getData() {
        try {
            var data = await getAllData()
            setData(data)
            console.log("INFO: ", data)
        } catch (error) {
            console.log(error)
        }
    }

    function handleFilterReset() {
        setSelectedCategory('')
        setSelectedType('')
        setSelectedDistrict('')

        if (districtRadioRef.current) districtRadioRef.current.checked = false;
        if (typeRadioRef.current) typeRadioRef.current.checked = false;
        if (categoryRadioRef.current) categoryRadioRef.current.checked = false;
    }

    let view;
    if (Array.isArray(data.lugares) && data.lugares.length > 0) {
        view =
            <>
                {data.lugares.map((item) => {
                    return (
                        <div key={item.id} className="col-md-4">
                            <SearchItemCard
                                item={item}
                            />
                        </div>
                    )
                })
                }
            </>
    } else if (Array.isArray(data.lugares) && data.lugares.length === 0) {
        view =
            <>
                <h5 style={{ color: "gray", fontWeight: "normal", textAlign: "center", padding: "1rem" }}>No se encontraron lugares con este filtro</h5>
            </>
    } else {
        view =
        <>
            <h5 style={{ color: "gray", fontWeight: "normal", textAlign: "center", padding: "1rem" }}>Actualmente no hay lugares</h5>
        </>
    }

    return (
        <>
            <Header />
            <div class="container d-flex pt-5 pb-5">
                <div class="col-lg-2 col-md-2 col-sm-2">
                    <div class="col d-flex" style={{ alignItems: "center", justifyContent: "space-evenly" }}>
                        <h3 style={{ marginRight: "1.5rem" }}>Filtros: </h3>
                        <button onClick={handleFilterReset} class="col d-flex" style={{ border: "0px", backgroundColor: "transparent", maxWidth: "max-content" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                            <div style={{ color: "gray", fontSize: "12px", marginLeft: "4px" }}>Limpiar todo</div>
                        </button>
                    </div>
                    <p>
                        <a style={{ textAlign: "center" }} class="btn btn-primary btn-filter" data-bs-toggle="collapse" href="#collapseCategories" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Categorías
                        </a>
                    </p>
                    <div class="collapse pb-3" id="collapseCategories">
                        <div class="card card-body">
                            {categories.map((cat) => (
                                <RadioCategory
                                    selectedCategory={selectedCategory}
                                    key={`cat_${cat.idCategoriaPadre}`}
                                    cat={cat}
                                    handleCategorySelection={(catId) => setSelectedCategory(catId)}
                                />
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
                                <RadioType
                                    selectedType={selectedType}
                                    key={`type_${type.id}`}
                                    type={type}
                                    handleTypeSelection={(typeId) => setSelectedType(typeId)}
                                />
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
                                <RadioDistrict
                                    selectedDistrict={selectedDistrict}
                                    key={`dist_${district.id}`}
                                    district={district}
                                    handleDistrictSelection={(districtId) => setSelectedDistrict(districtId)}
                                />
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 d-flex justify-content-center">
                    <div class="container">
                        <div class="row d-flex justify-content-right g-3 ps-5">
                            {view}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SearchScreen
import { useNavigate } from "react-router-dom";
import "../style/SearchItemCard.css"

function SearchItemCard({ item }) {

    var navigate = useNavigate()

    function handleCardClick(){
        navigate(`/detailElement/${item.id}`)
    }

    return (
        <>
            <div class="col d-flex justify-content-center">
                <div onClick={handleCardClick} class="card card-element col-sm-10" style={{ borderRadius: "20px" }}>
                    <img src={item.foto} class="card-img-top card-photo img-fluid" style={{ borderRadius: "20px 20px 0px 0px", height: "12rem", objectFit: "cover" }} alt="..." />
                    <div class="card-body">
                        <h5 class="card-title card-title-element">{item.nombre}</h5>
                        <p lass="card-text card-text-element">Costo: s/{item.costo}</p>
                        <span class="badge rounded-pill badge-item">{item.lugar}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchItemCard;
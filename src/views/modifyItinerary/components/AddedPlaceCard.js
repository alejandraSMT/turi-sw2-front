import { useNavigate } from "react-router-dom"
import "../style/AddedPlaceCard.css"

function AddedPlaceCard({ added }) {

    const navigate = useNavigate()

    function handleClick() {
        navigate("/detailElement/" + added.idLugar)
    }

    return (
        <>
            <div onClick={handleClick} className="column d-flex addedCard" id={`${added.idLugar}_lugar`} style={{ border: "2px solid lightgray", alignItems: "center", borderRadius: "20px", width: "100%", padding: "10px", margin: "1rem" }}>
                <img class="img-fluid" src={added.foto} style={{ height: "10rem", width: "10rem", objectFit: "cover", margin: "1rem", borderRadius: "20px", border: "1px solid lightgray" }} />
                <div class="row d-flex">
                    <h4>{added.nombre}</h4>
                    <h6 style={{ color: "gray", fontWeight: "normal" }}>{added.descripcion}</h6>
                </div>
            </div>
        </>
    )
}

export default AddedPlaceCard
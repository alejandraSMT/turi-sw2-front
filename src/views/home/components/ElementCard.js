import "../styles/ElementCardStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useNavigate } from 'react-router-dom'

// card de cada uno de los lugares que van en el carrousel
// muestra información resumida de los lugares
function ElementCard({ id, name, distrito, url, costo }) {

    const navigate = useNavigate()

    // cuando se le da click a un card, este toma el id del lugar y hace una navegación a la pantalla de Detail Element donde se
    // mostrará más información de ese lugar en específico
    function handleCardClick() {
        navigate("/detailElement/"+id)
    }

    return (
        <>
            <div class="col d-flex justify-content-center">
                <div class="card card-element col-sm-10" onClick={handleCardClick} style={{ borderRadius: "20px"}}>
                    <img src={url} class="card-img-top card-photo img-fluid" style={{ borderRadius: "20px 20px 0px 0px",height:"12rem", objectFit:"cover"}} alt="..." />
                    <div class="card-body">
                        <h5 class="card-title card-title-element">{name}</h5>
                        <p lass="card-text card-text-element">{distrito}</p>
                        <p class="card-text card-text-element">s/ {costo} por persona</p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ElementCard;

import "../styles/ElementCardStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ElementCard({ name, distrito, url, costo }) {

    function handleCardClick() {
        alert("CLICK AL CARD")
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

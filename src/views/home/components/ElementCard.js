import "../styles/ElementCardStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ElementCard({ name, description, url, price }) {

    function handleCardClick() {
        alert("CLICK AL CARD")
    }

    return (
        <>
            <div class="col d-flex justify-content-center">
                <div class="card card-element col-sm-10" onClick={handleCardClick} style={{ borderRadius: "20px" }}>
                    <img src={url} class="card-img-top image w-auto" style={{ borderRadius: "20px 20px 0px 0px" }} alt="..." />
                    <div class="card-body">
                        <h5 class="card-title card-title-element">{name}</h5>
                        <p class="card-text card-text-element">{price} por persona</p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ElementCard;

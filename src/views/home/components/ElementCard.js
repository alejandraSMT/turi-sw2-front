import "../styles/ElementCardStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ElementCard({ name, description, url }) {

    return (
        <>
            <div class="card card-element col-sm-11" style={{borderRadius:"20px"}}>
                <img src={url} class="card-img-top image"  style={{borderRadius:"20px 20px 0px 0px"}} alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <p class="card-text">{description}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
            </div>
        </>
    );

}

export default ElementCard;

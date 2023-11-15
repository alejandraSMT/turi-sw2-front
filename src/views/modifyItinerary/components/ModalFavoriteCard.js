import { useEffect, useState } from "react";
import "../style/ModalFavoriteCard.css"


function ModalFavoriteCard({ favorite, selectedFavorites, setSelectedFavorites, clicks, setClicks, reload, setReload, setPlaceSelected}) {

    //const [selected, setSelected] = useState(false)
    useEffect(() =>{
        var element = document.getElementById(`${favorite.idLugar}`)
        if(reload){
            element.style.border = "2px solid lightgray"
        }
    })

    function validateClick() {
        var element = document.getElementById(`${favorite.idLugar}`)
        if(clicks === 0){
            setSelectedFavorites(favorite)
            setClicks(clicks + 1)
            setReload(false)
            element.style.border = "2px solid #588a4d"
            setPlaceSelected(favorite.idLugar)
        }else if(clicks === 1){
            setSelectedFavorites([])
            setClicks(clicks - 1)
            setReload(false)
            element.style.border = "2px solid lightgray"
        }
    }
    

    return (
        <>
            <div className="column d-flex" id={favorite.idLugar} onClick={validateClick} style={{border: "2px solid lightgray", alignItems:"center", borderRadius: "20px", width: "100%", padding: "10px", margin: "0.5rem" }}>
                <img class="img-fluid" src={favorite.foto} style={{height:"5rem", width:"5rem", objectFit:"cover", margin:"1rem",borderRadius:"20px", border:"1px solid lightgray"}}/>
                <h4>{favorite.nombre}</h4>
            </div>
        </>
    );

}

export default ModalFavoriteCard;
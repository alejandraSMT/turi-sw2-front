import { useEffect, useState } from "react";
import "../style/ModalFavoriteCard.css"


function ModalFavoriteCard({ favorite, selectedFavorites, setSelectedFavorites, clicks, setClicks, reload, setReload}) {

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
        }else if(clicks === 1){
            setSelectedFavorites([])
            setClicks(clicks - 1)
            setReload(false)
            element.style.border = "2px solid lightgray"
        }
    }
    

    return (
        <>
            <div className="row" id={favorite.idLugar} onClick={validateClick} style={{ border: "2px solid lightgray", borderRadius: "20px", width: "100%", padding: "10px", margin: "0.5rem" }}>
                <h4>{favorite.nombre}</h4>
            </div>
        </>
    );

}

export default ModalFavoriteCard;
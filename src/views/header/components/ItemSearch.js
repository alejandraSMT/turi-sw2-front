
import { useNavigate } from "react-router-dom";
import "../styles/HeaderStyle.css"

function ItemSearch({item}) {

    const navigate = useNavigate()

    function handleClick(){
        navigate(`/detailElement/${item.id}`)
    }
    return (
        <>
            <button onClick={handleClick} className="options">
                {item.nombre}
            </button>
        </>
    )
}

export default ItemSearch;
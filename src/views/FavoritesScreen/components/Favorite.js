import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Favorite(props) {
  const navigate = useNavigate();
  const userToken = window.sessionStorage.getItem("userToken")

  console.log(props.id);

  const handleFavoriteClick = () => {
    console.log(props.id);
    navigate("/detailElement/" + props.id)
  };

  function handleDelete(){
    fetch(`http://localhost:3000/api/v1/FavoritoRouter/eliminar?token=${userToken}&idLugar=${props.id}`, {
        method: 'DELETE', //metodo DELETE porque se va a eliminar data 
      })
        .then((response) => response.json())
        .then((data) => {
          //si se hace bien la conexion se mostrara en pantalla un mensaje de que se agrego como favorito

          if (data.status === 'success') {

            console.log("Favorito eliminado")
          }
        })
        .catch((error) => {
          //si NO se hace bien la conexion se mostrara en pantalla un mensaje de error 

          console.error('Error al eliminar favorito:', error);
        });
      //se vuelve a cargar la pagina para mostrar el cambio de la imagen simulando que se elimino (estrella vacia)
      window.location.reload();
  }

  return (
    <>
      <div className="column d-flex" id={`${props.id}_lugarfav`} style={{ border: "2px solid lightgray", alignItems: "center", borderRadius: "20px", width: "100%", padding: "10px", cursor:"default" }}>
        <div class="col-lg-10 d-flex" style={{ alignItems: "center" }}>
          <img class="img-fluid" src={props.foto} style={{ height: "10rem", width: "10rem", objectFit: "cover", margin: "1rem", borderRadius: "20px", border: "1px solid lightgray" }} />
          <div class="row d-flex">
            <h4 class="name-favorite" onClick={handleFavoriteClick}>{props.nombre}</h4>
            <h6 style={{ color: "gray", fontWeight: "normal" }}>{props.descripcion}</h6>
          </div>
        </div>
        <div class="col-lg-2 d-flex" style={{ justifyContent: "center", textOverflow: "ellipsis" }}>
          <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#F4CE14" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Favorite;

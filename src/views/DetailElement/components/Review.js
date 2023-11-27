import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ImagenEliminar from '../images/eliminar.png';
import moment from "moment";

import estrella05 from '../estrellas/0.5_estrellas.png';
import estrella1 from '../estrellas/1_estrellas.png';
import estrella15 from '../estrellas/1.5_estrellas.png';
import estrella2 from '../estrellas/2_estrellas.png';
import estrella25 from '../estrellas/2.5_estrellas.png';
import estrella3 from '../estrellas/3_estrellas.png';
import estrella35 from '../estrellas/3.5_estrellas.png';
import estrella4 from '../estrellas/4_estrellas.png';
import estrella45 from '../estrellas/4.5_estrellas.png';
import estrella5 from '../estrellas/5_estrellas.png';

function Review(props) {
  const navigate = useNavigate();

  const userToken = window.sessionStorage.getItem("userToken")
  const [userVerify, setUserVerify] = useState('')

  useEffect(() => {
    getData();
  }, '')

  console.log(props.id);

  const EliminarReview = () => {
    console.log(props.idReseña)
    fetch(`http://localhost:3000/api/v1/ResenaRouter/eliminarPorLugar?idReseña=${props.id}`, {
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

  async function getUsuario() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/UsuarioRouters/getNombreUsuario?token=${userToken}`, {
          method: "GET"
        })
        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async function getData() {
    try {
      const data = await getUsuario()
      setUserVerify(data)
    } catch (error) {
      console.error(error)
    }
  }

  const verificarPuntuacion = () => {

    if (props.puntaje == 0.5) {
      return estrella05;
    } else if (props.puntaje == 1) {
      return estrella1;
    } else if (props.puntaje == 1.5) {
      return estrella15;
    } else if (props.puntaje == 2) {
      return estrella2;
    } else if (props.puntaje == 2.5) {
      return estrella25
    } else if (props.puntaje == 3) {
      return estrella3
    } else if (props.puntaje == 3.5) {
      return estrella35
    } else if (props.puntaje == 4) {
      return estrella4
    } else if (props.puntaje == 4.5) {
      return estrella45
    } else {
      return estrella5
    }

  }

  let noPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  let photo;
  if (props.foto !== '') {
    photo = <img class="img-account-profile rounded-circle mb-2" width="160" src={props.foto} style={{ objectFit: "cover" }} alt="" />
  } else {
    photo = <img class="img-account-profile rounded-circle mb-2" width="160" src={noPhoto} style={{ objectFit: "cover" }} alt="" />
  }

  let deleteIcon;
  if (props.usuario === userVerify.nombreUsuario) {
    deleteIcon =
      <>
        <div className='col-lg-1 col-md-1 col-sm-1 d-flex' style={{ justifyContent: "end" }}>
          <img src={ImagenEliminar} className="ImagenEliminar" onClick={EliminarReview}></img>
        </div>
      </>
  }



  return (
    <>
      <div class="container d-flex" style={{ border: "2px solid lightgray", borderRadius: "20px", padding: "1rem" }}>
        <div class="col-lg-12 d-flex">
          <div class="col-lg-2 col-md-2 col-sm-2 d-flex" style={{ justifyContent: "center" }}>
            <div className='' style={{ padding: "0 1rem 0 0" }}>
              {photo}
              <h5 style={{ textAlign: "center" }}>{props.nombreUsuario}</h5>
              <h6 style={{ textAlign: "center", color: "gray", fontWeight: "normal" }} >{props.usuario}</h6>
            </div>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-9">
            <div class="col d-flex" style={{ alignItems: "center", marginBottom: "1rem" }}>
              <h5>Puntaje: </h5>
              <img style={{ height: "40px" }}
                src={verificarPuntuacion()}
                alt="Puntuacion Icon"
              />
            </div>
            <div class="col" style={{ alignItems: "center", marginBottom: "1rem" }}>
              <h5>Comentario: </h5>
              <div class="text" style={{overflow: "hidden", textOverflow: "ellipsis"}}>{props.comentario}</div>
            </div>
            <div class="col" style={{ alignItems: "center", marginBottom: "1rem" }}>
              <h5>Fecha de visita: </h5>
              {moment(props.fechaCreacion).utc().format('DD/MM/YYYY')}
            </div>
          </div>
          {deleteIcon}
        </div>

      </div>
    </>
  );
}

export default Review;

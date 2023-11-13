import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ImagenEliminar from '../images/eliminar.png';
function Review(props) {
  const navigate = useNavigate();

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


  
  return (
    <Container className='ReviewItem'>
     <Row>
        
        <Col>
        <h4 className='UserName'>{props.nombreUsuario}</h4>
        </Col>

        <Col>
        <h5 >Comentario: {props.comentario}</h5>
        </Col>

        <Col>
        <h5>Puntaje: {props.puntaje}</h5>
        </Col>

        <Col>
        <h5>Fecha: {props.fechaCreacion}</h5>
        </Col>
        
        <Col>
        <img src={ImagenEliminar} className="ImagenEliminar" onClick={EliminarReview}></img>
        </Col>
     </Row>
        
        
    
        
    </Container>
  );
}

export default Review;

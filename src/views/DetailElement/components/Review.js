import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Review(props) {
  const navigate = useNavigate();

  console.log(props.id);
  
  
  return (
    <Container className='ItineraryItem'>
     <Row>
        
        <Col>
        <h4 className='ItineraryName'>{props.nombreUsuario}</h4>
        </Col>

        <Col>
        <h5 className='cantDias'>Comentario: {props.comentario}</h5>
        </Col>
     </Row>
        
        
    
        
    </Container>
  );
}

export default Review;

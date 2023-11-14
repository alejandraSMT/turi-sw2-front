import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function ItineraryItem(props) {
  const navigate = useNavigate();

  console.log(props.id);
  
  const handleItineraryClick = () => {

    
    
  };
  return (
    <Container className='ItineraryItem' onClick={() => handleItineraryClick()}>
     <Row>
        
        <Col>
        <h4 className='ItineraryName'>{props.nombre}</h4>
        </Col>

        <Col>
        <h5 className='cantDias'>Cantidad de dias: {props.cantDias}</h5>
        </Col>
     </Row>
        
        
    
        
    </Container>
  );
}

export default ItineraryItem;

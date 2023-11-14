import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Favorite(props) {
  const navigate = useNavigate();

  console.log(props.id);
  
  const handleFavoriteClick = () => {

    console.log(props.id);
    navigate("/detailElement/"+props.id)
  };
  return (
    <Container className='FavoriteItem' onClick={() => handleFavoriteClick()}>
     <Row>
        <Col>
        <img src={props.foto} className='PhotoFavorite' />
        </Col>
        
        <Col>
        <h4 className='FavoriteName'>{props.nombre}</h4>
        </Col>

        <Col>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/009/342/149/small/golden-stars-clipart-design-illustration-free-png.png" className='StarFavorite'/>
        </Col>
     </Row>
        
        
    
        
    </Container>
  );
}

export default Favorite;

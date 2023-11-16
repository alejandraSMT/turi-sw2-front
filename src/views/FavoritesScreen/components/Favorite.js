import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Favorite(props) {
  const navigate = useNavigate();

  console.log(props.id);

  const handleFavoriteClick = () => {

    console.log(props.id);
    navigate("/detailElement/" + props.id)
  };
  return (
    <>
      <div className="column d-flex" id={`${props.id}_lugarfav`} style={{ border: "2px solid lightgray", alignItems: "center", borderRadius: "20px", width: "100%", padding: "10px", margin: "1rem" }}>
        <div class="col-lg-10 d-flex" style={{alignItems:"center"}}>
          <img class="img-fluid" src={props.foto} style={{ height: "10rem", width: "10rem", objectFit: "cover", margin: "1rem", borderRadius: "20px", border: "1px solid lightgray" }} />
          <h4>{props.nombre}</h4>
        </div>
        <div class="col-lg-2 d-flex" style={{justifyContent:"end", padding:"0 4rem 0 0"}}>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/009/342/149/small/golden-stars-clipart-design-illustration-free-png.png" className='StarFavorite' />
        </div>
      </div>
    </>
  );
}

export default Favorite;

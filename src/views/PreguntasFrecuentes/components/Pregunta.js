import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Pregunta(props) {
  const navigate = useNavigate();

  console.log(props.id);

 
  return (
    <>
      <div className="column d-flex" id={`${props.id}_lugarfav`} style={{ border: "2px solid lightgray", alignItems: "center", borderRadius: "20px", width: "98%", padding: "10px", margin: "1rem" }}>
        <div class="col-lg-10 d-flex" style={{ alignItems: "center" }}>
          <div class="row d-flex">
            <h4>{props.pregunta}</h4>
            <h6 style={{color:"gray", fontWeight:"normal"}}>{props.respuesta}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pregunta;
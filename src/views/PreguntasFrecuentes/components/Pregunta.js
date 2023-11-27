import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Pregunta(props) {
  const navigate = useNavigate();
  console.log(props.id_pregunta);


  return (
    <>
      <div class="accordion-item question-item">
        <h2 class="accordion-header" id={`${props.id}_heading`}>
          <button class="accordion-button" style={{ backgroundColor: "white", border: "1px solid lightgray", borderRadius: "20px" }} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.id}_collapse`} aria-expanded="true" aria-controls={`${props.id}_collapse`}>
            <h4>{props.pregunta}</h4>
          </button>
        </h2>
        <div id={`${props.id}_collapse`} class={`accordion-collapse collapse ${props.isCollapsed ? 'show' : ''}`} aria-labelledby={`${props.id}_heading`} data-bs-parent={`#${props.id}_id`}>
          <div class="accordion-body">
            {props.respuesta}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pregunta;
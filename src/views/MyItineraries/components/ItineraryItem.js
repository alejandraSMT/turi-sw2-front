import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
let imgLima = require("./lima.jpg")

function ItineraryItem(props) {
  const navigate = useNavigate();

  console.log(props.id);

  const handleItineraryClick = () => {
    navigate("/modifyItinerary/"+props.id)
  };
  return (
    <>
      <div class="container itinerary-container mt-5 ps-5" onClick={handleItineraryClick} style={{ border: "1px solid lightgray", borderRadius: "20px" }}>
        <div class="row d-flex" style={{ alignItems: "center" }}>
          <div class="col-lg-4">
            <h2> {props.nombre} </h2>
            <div class="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar" viewBox='0 0 16 16'>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              <h5 style={{ margin: "1rem", textAlign: "center" }}> {props.cantDias} dias</h5>
            </div>
          </div>
          <div class="col-lg-8 d-flex p-0">
            <img class="w-100" src={imgLima} style={{ width: "80rem", maxHeight: "15rem", objectFit: "cover", borderRadius: "0rem 20px 20px 0rem" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItineraryItem;

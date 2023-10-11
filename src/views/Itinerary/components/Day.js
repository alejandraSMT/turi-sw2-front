import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import { Container, Col, Row,FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function Day(props){
const { index, days } = props;
const favorites = ["Tanta","Parque de las Leyendas", "Pizza Raul","Larcomar","Jockey Plaza","Parque de las Aguas"];
const times = ["Dia","Tarde","Noche"];

const [itinerario, setItinerario] = useState([]);
const [selectedFavorite, setSelectedFavorite] = useState(favorites[0]);
const [selectedTime, setSelectedTime] = useState(times[0]);
const [arrayDia, setArrayDia] = useState([]);

const AddFavorite = () => {
  

  // la posicion 1 debe ser la actividad del dia, la 2 de la tarde y la 3 de la noche
  
  
  if(selectedTime === "Dia"){
    setArrayDia([selectedFavorite, arrayDia[1], arrayDia[2]]);
    //arrayDia[0] = selectedFavorite;
  }else if(selectedTime === "Tarde"){
    //arrayDia[1] = selectedFavorite;
    setArrayDia([arrayDia[0],selectedFavorite, arrayDia[2]]);
  }else if(selectedTime === "Noche"){
    //arrayDia[2] = selectedFavorite;
    setArrayDia([arrayDia[0],arrayDia[1],selectedFavorite]);

  }
  days[index] = arrayDia;
  
  setSelectedFavorite(selectedFavorite);
  setSelectedTime(selectedTime);
  console.log(days[index]);
  console.log(days);
  
};


    return(

       <Container>
        <div className="DayNumberHeader">
        <h1 className="DayNumberTitle">Dia {index + 1}</h1>
        
        
        <select className="SelectedBox"  onChange={(e) => setSelectedFavorite(e.target.value)}>
            
              {favorites.map((favorite, index) => (
                <option key={index} value={favorite}>
                  {favorite}
                </option>
              ))}   
        </select>

        <select  className="SelectedBox" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}> 
            
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
        </select>

        <Button onClick={AddFavorite} className="Button"> Agregar </Button>
        </div>
        <Container className="ContainerDayItinerary">
        <div className="TimeTitle">
        <Row>

        
       <Col> <h2>Dia</h2></Col>
        <Col><img src="https://www.vippng.com/png/full/164-1649488_minus-sol-y-nubes-rayos-de-sol-dibujos.png" className="TimeImage"/></Col>
        <Col><div className="rptFavorite">{arrayDia[0]}</div></Col>
        </Row>
        </div>
        
        
        <br/>

        <div className="TimeTitle">
        <Row>
        <Col><h3 >Tarde</h3></Col>
        <Col><img src="https://cdn-icons-png.flaticon.com/512/2972/2972516.png" className="TimeImage"/></Col>
        <Col><div className="rptFavorite">{arrayDia[1]}</div></Col>
        </Row>
        </div>
        
       
        <br/>

        <div className="TimeTitle">
        <Row>
        <Col><h3>Noche</h3></Col>
        <Col><img src="https://cdn-icons-png.flaticon.com/512/3026/3026346.png" className="TimeImage"/></Col>
        <Col><div className="rptFavorite">{arrayDia[2]}</div></Col>
        </Row>
        </div>
       
        <br/>
        <br/>
        </Container>
        </Container>
    );
}
export default Day;
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import { Container, Col, Row,FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function Day(props){
const { index } = props;
const favorites = ["Tanta","Parque de las Leyendas", "Pizza Raul","Larcomar","Jockey Plaza","Parque de las Aguas"];
const times = ["Dia","Tarde","Noche"];

const [itinerario, setItinerario] = useState([]);
const [selectedFavorite, setSelectedFavorite] = useState(favorites[0]);
const [selectedTime, setSelectedTime] = useState(times[0]);
const [arrayDia, setArrayDia] = useState(["","",""]);

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
  itinerario[index] = arrayDia;
  setItinerario(itinerario);
  setSelectedFavorite(selectedFavorite);
  setSelectedTime(selectedTime);
  console.log(itinerario[index]);
  
};


    return(

       <Container>
        <div id="header-day">
        <h1 id="Tittle">Dia {index + 1}</h1>
        
        
        <select id="selected"  onChange={(e) => setSelectedFavorite(e.target.value)}>
            
              {favorites.map((favorite, index) => (
                <option key={index} value={favorite}>
                  {favorite}
                </option>
              ))}   
        </select>

        <select  id="selected" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}> 
            
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
        </select>

        <Button onClick={AddFavorite} id="Buttons"> Agregar </Button>
        </div>
        <Container id="ContainerDay">
        <div id="TimeTitle">
        
        <h2>Dia</h2>
        <img src="https://www.vippng.com/png/full/164-1649488_minus-sol-y-nubes-rayos-de-sol-dibujos.png" id="TimeImage"/>
        <div id="rptFavorite">{arrayDia[0]}</div>
        </div>
        
        
        <br/>
        <div id="TimeTitle">
        <h3 >Tarde</h3>
        <img src="https://cdn-icons-png.flaticon.com/512/2972/2972516.png" id="TimeImage"/>
        <div id="rptFavorite">{arrayDia[1]}</div>
        </div>
        
       
        <br/>
        <div id="TimeTitle">
        <h3>Noche</h3>
        <img src="https://cdn-icons-png.flaticon.com/512/3026/3026346.png" id="TimeImage"/>
        <div id="rptFavorite">{arrayDia[2]}</div>
        </div>
       
        <br/>
        <br/>
        </Container>
        </Container>
    );
}
export default Day;
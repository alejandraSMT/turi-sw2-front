import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import { Container, Col, Row,FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import React, { useState, useEffect, useSyncExternalStore } from 'react';


function Day(props){


const idViaje =2;
const { index, dayNumber, arrayFavorites  } = props;

const times = ["Dia","Tarde","Noche"];
const [idLugarFavorite, setIdLugarFavorite] = useState(arrayFavorites[0].idLugar);
 
const [selectedFavorite, setSelectedFavorite] = useState(arrayFavorites[0].nombre);
const [selectedTime, setSelectedTime] = useState(times[0]);
const [selectedTimeID, setSelectedTimeID] = useState(0);
const [arrayDia, setArrayDia] = useState(['', '', '']);

const handleFavorite = (e) => {
  const selectedValue = e.target.value;
  // Encuentra el objeto en arrayFavorites que coincida con el nombre seleccionado
  const selectedFavorite = arrayFavorites.find((favorite) => favorite.nombre === selectedValue);

  if (selectedFavorite) {
    setSelectedFavorite(selectedValue);
    setIdLugarFavorite(selectedFavorite.id);
  }
};

const handleTime = (e) =>{
  console.log('Botón AddFavorite clicado');
  const selectedValue = e.target.value;
  // Copia el array actual
  let updatedArrayDia = [...arrayDia];

  // Actualiza el array según el tiempo seleccionado
  if (selectedValue === 'Dia') {
    updatedArrayDia[0] = selectedFavorite;
    
    setSelectedTimeID(1);
  } else if (selectedValue === 'Tarde') {
    updatedArrayDia[1] = selectedFavorite;
    
    setSelectedTimeID(2);
  } else if (selectedValue === 'Noche') {
    updatedArrayDia[2] = selectedFavorite;
    
    setSelectedTimeID(3);
  }
  console.log('arrayDia después de la actualización:', updatedArrayDia);
setSelectedTime(selectedValue);

  // Actualiza el estado con el nuevo arrayDia
  setArrayDia(updatedArrayDia);

  console.log('selectedFavorite:', selectedFavorite);
  console.log('selectedTime:', selectedTime);
  console.log('idSelectFavorite:', idLugarFavorite);
  console.log('selectedTimeID', selectedTimeID);
}
const AddFavorite = () => {
  /*
  console.log('Botón AddFavorite clicado');

  // Copia el array actual
  let updatedArrayDia = [...arrayDia];

  // Actualiza el array según el tiempo seleccionado
  if (selectedTime === 'Dia') {
    updatedArrayDia[0] = selectedFavorite;
    setSelectedTimeID(1);
  } else if (selectedTime === 'Tarde') {
    updatedArrayDia[1] = selectedFavorite;
    setSelectedTimeID(2);
  } else if (selectedTime === 'Noche') {
    updatedArrayDia[2] = selectedFavorite;
    setSelectedTimeID(3);
  }
  console.log('arrayDia después de la actualización:', updatedArrayDia);

  // Actualiza el estado con el nuevo arrayDia
  setArrayDia(updatedArrayDia);

  console.log('selectedFavorite:', selectedFavorite);
  console.log('selectedTime:', selectedTime);
  console.log('idSelectFavorite:', idLugarFavorite);
  console.log('selectedTimeID', selectedTimeID);
*/
console.log('idSelectFavorite:', idLugarFavorite);
  const data = {
    "idViaje": idViaje,
      "idLugar": idLugarFavorite,
      "idTiempoDia": selectedTimeID,
      "numDia": dayNumber,
    
  };
  try {
    const response = fetch('http://localhost:3001/viajeLugar/registro', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud');
    }

    const responseData = response.json();
    console.log('Respuesta del servidor:', responseData);
  } catch (error) {
    console.error('Error al agregar registro de ViajeLugar:', error);
  }

  
};

console.log(arrayDia)
    return(

       <Container>
        <div className="DayNumberHeader">
        <h1 className="DayNumberTitle">Dia {index + 1}</h1>
        
        <select  className="SelectedBox" value={selectedTime} onChange={handleTime}> 
            
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
        </select>

        <select className="SelectedBox" value={selectedFavorite} onChange={handleFavorite}>
  {arrayFavorites.map((favorite, index) => (
    <option key={index} value={favorite.nombre}>
      {favorite.nombre}
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
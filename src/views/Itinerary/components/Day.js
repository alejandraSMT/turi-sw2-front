import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import { Container, Col, Row, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect, useSyncExternalStore } from 'react';


function Day(props) {


  //se definen la variables que se envian desde Itinerary.js
  const { index, dayNumber, arrayFavorites, idViaje } = props;

  //array con los momentos del dia
  const times = ["Dia", "Tarde", "Noche"];

  //se definen la variable del id del favorito seleccionado y su setter para cuando se cambie el valor
  const [idSelectedFavorite, setIdSelectedFavorite] = useState("");

  //se definen la variable del nombre del favorito seleccionado y su setter para cuando se cambie el valor
  const [selectedFavorite, setSelectedFavorite] = useState("");

  //se definen la variable del nombre del momento del dia seleccionado y su setter para cuando se cambie el valor
  const [selectedTime, setSelectedTime] = useState("");

  //se definen la variable del id  del momento del dia seleccionado y su setter para cuando se cambie el valor
  const [selectedTimeID, setSelectedTimeID] = useState('');

  //se definen el array del dia donde se guardan las 3 actividades que el usuario realizara en los
  //3 momentos del dia (Dia, Tarde, Noche) y su setter para cuando se cambie el valor
  const [arrayDia, setArrayDia] = useState(['', '', '']);

  
//funcion para cuando se cambie el momento del dia al escoger
  const handleTime = (e) => {
    const selectedValue = e.target.value;
    setSelectedTime(selectedValue)
    if (selectedValue === "Dia") {
      setSelectedTimeID(1)
    } else if (selectedValue === "Tarde") {
      setSelectedTimeID(2)
    } else if (selectedValue === "Noche") {
      setSelectedTimeID(3)
    } else {
      setSelectedTimeID("")
    }
  }

  //funcion para cuandon se cambie el favoriton al escoger
  const handleFavorite = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setSelectedFavorite("")
      setIdSelectedFavorite("")
    } else {
      //el valor seleccionado no es null y se busca en el array de favoritos por nombre para luego
      //setear su nombre y el idLugar
      const selectedFavorite = arrayFavorites.find((favorite) => favorite.nombre === selectedValue);
      if (selectedFavorite) {
        setSelectedFavorite(selectedFavorite.nombre)
        console.log("_________ID LUGAR SELECCIONADO: ",selectedFavorite.idLugar)
        setIdSelectedFavorite(selectedFavorite.idLugar)
      }
    }
  }

  console.log("TIEMPO SELECCIONADO: ", selectedTime)
  console.log("TIEMPO ID SELECCIONADO: ", selectedTimeID)
  console.log("FAVORITO SELECCIONADO: ", selectedFavorite)
  console.log("FAVORITO ID SELECCIONADO: ", idSelectedFavorite)

  //funcion para agregar favorito al itinerario
  async function AddFavorite() {

  
    if (selectedTimeID !== "" && idSelectedFavorite !== "") {
  //se envia el objeto JSON con la informacion del viaje, lugar, el momento del dia y el numero de dia
      const data = {
        "idViaje": idViaje,
        "idLugar": idSelectedFavorite,
        "idTiempoDia": selectedTimeID,
        "numDia": dayNumber,

      };

      try {
    // se llama al endpoint viajeLugar/registro para enviar el objeto JSON por el metodo POST
        const response = await fetch('http://localhost:3000/viajeLugar/registro', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //luego del agregar el lugar al itinerario, se copia el arrayDia con las actividades y se empieza
        //a mostrar en pantalla dependiendo del momento del dia
        let updatedArrayDia = [...arrayDia];

        // Actualiza el array según el tiempo seleccionado
        if (selectedTime === 'Dia') {
          updatedArrayDia[0] = selectedFavorite;
        } else if (selectedTime === 'Tarde') {
          updatedArrayDia[1] = selectedFavorite;
        } else if (selectedTime === 'Noche') {
          updatedArrayDia[2] = selectedFavorite;
        }
        console.log('arrayDia después de la actualización:', updatedArrayDia);


        // Actualiza el estado con el nuevo arrayDia
        setArrayDia(updatedArrayDia);

        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud');
        }

      } catch (error) {
        console.error('Error al agregar registro de ViajeLugar:', error);
      }


    }else{
      alert("Debe seleccionar un tiempo del día y lugar válido")
    }

  }

  return (

    <Container>
      <div className="DayNumberHeader">
        {/*numero del dia titulo */}
        <h1 id="DayNumberTitle">Día {index + 1}</h1>
  {/*lista desplegable para escoger el momento del dia */}
        <select id="SelectedBox" value={selectedTime} onChange={handleTime}>
          <option key={-1} value={""}>
            Escoger opción
          </option>
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
  {/*lista desplegable para escoger el lugar del array de favoritos */}

        <select id="SelectedBox" value={selectedFavorite.nombre || selectedFavorite} onChange={handleFavorite}>
          <option key={-1} value={""}>
            Escoger opción
          </option>
          {arrayFavorites.map((favorite, index) => (
            <option key={index} value={favorite.nombre}>
              {favorite.nombre}
            </option>
          ))}
        </select>


  {/*Boton para agregar el lugar favorito al itinerario*/}

        <Button onClick={AddFavorite} disabled={selectedTimeID==="" || idSelectedFavorite===""} id="Button"> Agregar </Button>
      </div>

        {/*Tabla de dia con sus momentos del dia que se mostrara en pantalla */}

      <Container className="ContainerDayItinerary">
        <div className="TimeTitle">
          <Row>


            <Col> <h2>Dia</h2></Col>
            <Col><img src="https://www.vippng.com/png/full/164-1649488_minus-sol-y-nubes-rayos-de-sol-dibujos.png" className="TimeImage" /></Col>
            <Col><div className="rptFavorite">{arrayDia[0]}</div></Col>
          </Row>
        </div>


        <br />

        <div className="TimeTitle">
          <Row>
            <Col><h3 >Tarde</h3></Col>
            <Col><img src="https://cdn-icons-png.flaticon.com/512/2972/2972516.png" className="TimeImage" /></Col>
            <Col><div className="rptFavorite">{arrayDia[1]}</div></Col>
          </Row>
        </div>


        <br />

        <div className="TimeTitle">
          <Row>
            <Col><h3>Noche</h3></Col>
            <Col><img src="https://cdn-icons-png.flaticon.com/512/3026/3026346.png" className="TimeImage" /></Col>
            <Col><div className="rptFavorite">{arrayDia[2]}</div></Col>
          </Row>
        </div>

        <br />
        <br />
      </Container>
    </Container>
  );
}
export default Day; 
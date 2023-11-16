import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Itinerary.css';

import { Container, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Day from './components/Day.js';
import Header from '../header/Header';
import ItineraryItem from '../MyItineraries/components/ItineraryItem.js';
import { useNavigate } from 'react-router-dom';

function Itinerary() {
  //se definen la variable del id del viaje y su setter para cuando se cambie el valor
  const [idViaje, setIdViaje] = useState('');

  //se obtiene el idUsuario 
  const userToken = window.sessionStorage.getItem('userToken');
  const userId = window.sessionStorage.getItem("userId");

  const [stillLoading, setStillLoading] = useState(false);

  //se definen la variable para el numero de dias y su setter para cuando se cambie el valor
  const [numberOfDays, setNumberOfDays] = useState('');
  const [itineraryName, setItineraryName] = useState('');

  const [arrayItineraries, setArrayItineraries] = useState([]);

  //se definen la variable para el array de la cantidad de dias y su setter para cuando se cambie el valor
  const [arrayDays, setArrayDays] = useState([]);


  //variable para el boton guardar y que aparezca
  const [appearSaveButton, setAppearSaveButton] = useState(false);

  const [nextPage, setNextPage] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setStillLoading(true)
    getAllInfoPlace()
  }, [])


  //se llama a la funcion getAllInfoPlace donde estan en orden las llamadas a los endpoints que se ejecutan
  // en simultaneo al cargar la pagina

  //se muestra el mensaje al darle click al boton Guardar
  const MensajeGuardar = () => {
    window.alert("Itinerario Guardado")
  }

  // Función para generar los días
  const handleGenerateClick = () => {
    // Parsea la cantidad de días a un número
    const cantDays = numberOfDays;

    //se crea el objeto JSON que sera enviado al endpoint
    const viajeData = {
      token: userToken,
      nombre: itineraryName,
      cantDias: cantDays
    };

    // Verifica si la entrada es un número válido y mayor que cero
    //el maximon de dias son 7 (1 semana)
    if (!isNaN(cantDays) && cantDays > 0 && cantDays < 8) {
      // Genera un arreglo de números del 1 al número de días ingresados
      const arrayDays = Array.from({ length: cantDays }, (_, index) => index + 1);

      // Actualiza el estado con los días generados
      setArrayDays(arrayDays);

      // Realizar una solicitud POST al servidor
      fetch('http://localhost:3000/api/v1/ViajeRouter/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //se envia el objeto JSON
        body: JSON.stringify(viajeData),
      })
        .then((response) => response.json())
        .then((data) => {
          //se setea el IdViaje con el que se genero al hacer la solicitud POST
          setIdViaje(data.idViaje);
          console.log('Nuevo ID del viaje:', idViaje);
          console.log(data);
          setNextPage(true)
        })
        .catch((error) => {
          console.error('Error al registrar el viaje:', error);
          // Maneja los errores, como mostrar un mensaje de error al usuario.
        });
      // se setea el boton Guardar para que se muestre
      //setAppearSaveButton(true)
    } else {
      alert(
        //mensaje cuando se pone una cantidad de dias no permitida
        "EXCESO EN CANTIDAD DE DÍAS!!! \nPor favor, ingrese un numero entre 1 y 7"
      );
    }

  };

  async function getAllItineraries() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/ViajeRouter/traerViajes?token=${userToken}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log("LISTA DE ITINERARIOS RECIBIDA: ", data); // Verifica la respuesta del servidor
        resolve(data.viajes);
      } catch (error) {
        reject(error);
      }
    });
  }


  //getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
  //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
  async function getAllInfoPlace() {

    try {
      setStillLoading(true)
      var AllItineraries = await getAllItineraries()
      console.log("Recibido: ", AllItineraries)
      setArrayItineraries(AllItineraries)
      setStillLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (nextPage) {
    navigate("/modifyItinerary/" + idViaje)
  }

  function handleResetValues() {
    setItineraryName('')
    setNumberOfDays('')
  }


  let view;
  if (arrayItineraries.length <= 0) {
    view =
      <>
        <h5 style={{ color: "gray", fontWeight: "normal", textAlign: "center", padding: "1rem" }}>Actualmente no tiene itinerarios</h5>
      </>
  } else {
    view =
      <>
        {arrayItineraries.map((itinerary) => (
            <div key={itinerary.id}>
              <ItineraryItem
                nombre={itinerary.nombre}
                id={itinerary.id}
                cantDias={itinerary.cantDias}
              />
            </div>
          ))}
      </>
  }


  return (
    <>
      <Header />
      <Container style={{ marginBottom: "4rem" }}>
        <br />
        <h1 className="PreviousText">Mis viajes</h1>
        <div class="pt-3 pb-3 d-flex justify-content-center">
          <button class="itineraryButton" style={{ alignContent: "center" }} data-bs-toggle="modal" data-bs-target="#createItinerary" >Generar un itinerario</button>
        </div>
        <hr class="hr" />
        {view}
      </Container>


      <div class="modal fade" id="createItinerary" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createModalLabel">Crear itinerario</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row d-flex align-items-center" style={{ padding: "10px" }}>
                <FormLabel>Nombre del itinerario: </FormLabel>
                <FormControl
                  type="text"
                  id="nameForm"
                  style={{ width: "90%" }}
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                />
                <FormLabel style={{ color: "black", paddingTop: "1rem" }}>Ingrese la cantidad de días: </FormLabel>
                <FormControl
                  type="number"
                  id="DaysBox"
                  style={{ width: "90%" }}
                  min="1"
                  max="7"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <Button id="cancelButton" onClick={handleResetValues} data-bs-dismiss="modal">Cancelar</Button>
              <Button onClick={handleGenerateClick} id="Button" data-bs-dismiss="modal">Generar</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Itinerary;
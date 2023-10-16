import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Itinerary.css';

import { Container, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Day from './components/Day.js';
import Header from '../header/Header';

function Itinerary() {
  const [idViaje, setIdViaje] = useState('');
  const idUsuario = window.sessionStorage.getItem("usuarioId");
  const [numberOfDays, setNumberOfDays] = useState(''); // Estado para la cantidad de días
  const [arrayDays, setArrayDays] = useState([]); // Estado para el array de dias
  const [arrayFavorites, setArrayFavorites] = useState([]);
  useEffect(() => {

    getAllInfoPlace()

  }, []);

  async function getAllFavorites() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:3001/favoritos/TraerTodosFav?id=${idUsuario}`, {
          method: "GET"
        })
        const data = await response.json()
        resolve(data)
        console.log(data)
        console.log(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async function getAllInfoPlace() {

    try {
      var AllFavorites = await getAllFavorites()
      console.log(AllFavorites)
      setArrayFavorites(AllFavorites)

    } catch (error) {
      console.log(error)
    }
  }

  console.log("FAVORITOS LISTA: " + arrayFavorites)

  const MensajeGuardar = () => {
    window.alert("Itinerario Guardado")
  }
  // Función para generar los días
  const handleGenerateClick = () => {
    // Parsea la cantidad de días a un número
    const cantDays = numberOfDays;

    const viajeData = {
      cantDias: cantDays,
      idUsuario: idUsuario, // Reemplaza con el ID del usuario
    };

    // Verifica si la entrada es un número válido y mayor que cero
    if (!isNaN(cantDays) && cantDays > 0 && cantDays < 8) {
      // Genera un arreglo de números del 1 al número de días ingresados
      const arrayDays = Array.from({ length: cantDays }, (_, index) => index + 1);

      // Actualiza el estado con los días generados
      setArrayDays(arrayDays);
      // Realizar una solicitud POST al servidor
      fetch('http://localhost:3001/viaje/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(viajeData),
      })
        .then((response) => response.json())
        .then((data) => {

          setIdViaje(data.nuevoIdViaje);
          console.log('Nuevo ID del viaje:', idViaje);
          console.log(data);
          // Aquí puedes manejar la respuesta del servidor, como redirigir a una página de éxito o mostrar un mensaje.
        })
        .catch((error) => {
          console.error('Error al registrar el viaje:', error);
          // Maneja los errores, como mostrar un mensaje de error al usuario.
        });
    } else {
      alert(
        "EXCESO EN CANTIDAD DE DÍAS!!! \nPor favor, ingrese un numero entre 1 y 7"
      );
    }

  };


  return (
    <>
      <Header />
      <Container style={{marginBottom:"4rem"}}>
        <br />
        <h2 className="PreviousText">¡Crea tu itinerario ahora con Turi!</h2>
        <h3 className="PreviousText">Ingrese la cantidad de días para generar:</h3>

        <FormGroup id="DaysPicker">
          <FormLabel id="NumberOfDays">Días:</FormLabel>
          <FormControl
            type="number"
            id="DaysBox"

            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
          <Button onClick={handleGenerateClick} id="Button">Generar</Button>
        </FormGroup>

        <Container className='DayContainer'>
          {/* Mapea y renderiza los componentes "Day" del array de dias */}
          {arrayDays.map((day, index) => (
            <div key={index}>

              <Day key={index} dayNumber={day} index={index} days={arrayDays} arrayFavorites={arrayFavorites} idViaje={idViaje} />

            </div>
          ))}
        </Container>

        <div class="container d-flex justify-content-center mt-5 mb-10">
          <Button id="Button"onClick={MensajeGuardar}>Guardar</Button>
        </div>
      </Container>
    </>
  );
}

export default Itinerary;